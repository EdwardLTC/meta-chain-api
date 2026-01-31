import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Interface, InterfaceAbi, Log, LogDescription, WebSocketProvider } from 'ethers';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MARKETPLACE_ADDRESS } from '../../ultils/constrain';
import { ListingEventName, ListingStatus } from '../../../generated/prisma/enums.mjs';
import { EnvironmentService } from '../../environment/environment.service';
import * as runtime from '@prisma/client/runtime/client';
import { PrismaClient } from 'generated/prisma/client.mjs';

@Injectable()
export class ListingsListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ListingsListener.name);
  private readonly provider: WebSocketProvider;
  private readonly marketplaceABI: InterfaceAbi;
  private readonly listedTopic: string;
  private readonly cancelledTopic: string;
  private readonly boughtTopic: string;
  private readonly listenerId = 'ListingsListener';

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
    private environmentService: EnvironmentService,
  ) {
    const marketplace = this.contracts.getContract('Marketplace');
    this.marketplaceABI = this.contracts.getAbi('Marketplace')!;
    this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
    this.listedTopic = marketplace.interface.getEvent('Listed')!.topicHash;
    this.cancelledTopic = marketplace.interface.getEvent('Cancelled')!.topicHash;
    this.boughtTopic = marketplace.interface.getEvent('Bought')!.topicHash;
  }

  async onModuleInit() {
    await this.replayMissedEvents();
    await this.setupGlobalListener();
  }

  async onModuleDestroy() {
    await this.provider.destroy();
  }

  private async replayMissedEvents() {
    const cursor = await this.prisma.chainCursor.findUnique({
      where: {
        listenerId: this.listenerId,
      },
    });

    const latestBlock = await this.provider.getBlockNumber();

    if (!cursor) {
      await this.prisma.chainCursor.create({
        data: {
          listenerId: this.listenerId,
          lastBlock: String(latestBlock),
        },
      });

      this.logger.log(`[${this.listenerId}] Cursor initialized at block ${latestBlock}, skip replay`);
      return;
    }

    const fromBlock = BigInt(cursor.lastBlock) + 1n;
    if (fromBlock > BigInt(latestBlock)) return;

    const logs = await this.provider.getLogs({
      address: MARKETPLACE_ADDRESS,
      fromBlock: fromBlock,
      toBlock: latestBlock,
      topics: [[this.listedTopic, this.cancelledTopic, this.boughtTopic]],
    });

    this.logger.log(`[${this.listenerId}] Replaying ${logs.length} logs from block ${fromBlock} → ${latestBlock}`);

    for (const log of logs) {
      await this.handleEvent(log);
    }
  }

  private async setupGlobalListener() {
    const filter = {
      address: MARKETPLACE_ADDRESS,
      topics: [[this.listedTopic, this.cancelledTopic, this.boughtTopic]],
    };

    await this.provider.on(filter, async (log: Log) => {
      await this.handleEvent(log);
    });

    this.logger.log('Global listener setup completed');
  }

  private async handleEvent(log: Log) {
    const iface = new Interface(this.marketplaceABI);
    const parsedLog = iface.parseLog(log);

    if (!parsedLog) {
      this.logger.warn(`Failed to parse log: ${log.transactionHash}`);
      return;
    }

    try {
      const existed = await this.prisma.processedLog.findUnique({
        where: {
          listenerId_txHash_logIndex: {
            listenerId: this.listenerId,
            txHash: log.transactionHash,
            logIndex: log.index,
          },
        },
      });

      if (existed) return;

      await this.prisma.$transaction(async tx => {
        switch (parsedLog.name) {
          case 'Listed':
            await this.handleListedEvent(parsedLog, log, tx);
            break;

          case 'Cancelled':
            await this.handleCancelledEvent(parsedLog, log, tx);
            break;

          case 'Bought':
            await this.handleBoughtEvent(parsedLog, log, tx);
            break;

          default:
            this.logger.warn(`Unknown event: ${parsedLog.name}`);
        }
        await tx.processedLog.create({
          data: {
            listenerId: this.listenerId,
            txHash: log.transactionHash,
            logIndex: log.index,
          },
        });

        await tx.chainCursor.upsert({
          where: {
            listenerId: this.listenerId,
          },
          create: {
            listenerId: this.listenerId,
            lastBlock: String(log.blockNumber),
          },
          update: {
            lastBlock: String(log.blockNumber),
          },
        });
      });
    } catch (err: any) {
      this.logger.error(`Error handling event: ${err?.message ?? String(err)}`);

      try {
        await this.prisma.deadLetterEvent.upsert({
          where: {
            listenerId_txHash_logIndex: {
              listenerId: this.listenerId,
              txHash: log.transactionHash,
              logIndex: log.index,
            },
          },
          create: {
            listenerId: this.listenerId,
            eventName: parsedLog?.name ?? 'UNKNOWN',
            txHash: log.transactionHash,
            logIndex: log.index,
            blockNumber: String(log.blockNumber),
            payload: parsedLog?.args ?? {},
            errorMessage: err?.message ?? String(err),
          },
          update: {
            retryCount: { increment: 1 },
            errorMessage: err?.message ?? String(err),
          },
        });
      } catch (dlqErr) {
        this.logger.error(`[${this.listenerId}] Failed to write DLQ for tx=${log.transactionHash}`, dlqErr);
      }
    }
  }

  private async handleListedEvent(parsedLog: LogDescription, log: Log, tx: Omit<PrismaClient, runtime.ITXClientDenyList>) {
    const [listingId, seller, nft, tokenId, price, paymentToken, transactionCode] = parsedLog.args;

    this.logger.log(
      `Listed Event - Listing ID: ${listingId}, Seller: ${seller}, NFT: ${nft}, Token ID: ${tokenId}, Price: ${price}, Payment Token: ${paymentToken}, Transaction Code: ${transactionCode}, TxHash: ${log.transactionHash}`,
    );

    const txReceipt = await this.provider.getTransactionReceipt(log.transactionHash);

    await tx.listing.update({
      where: { id: transactionCode, status: ListingStatus.PENDING },
      data: {
        onchainId: listingId,
        txHash: log.transactionHash,
        status: ListingStatus.ACTIVE,
        listingEvents: {
          create: {
            eventName: ListingEventName.LISTED,
            txHash: log.transactionHash,
            txReceipt: txReceipt?.toJSON(),
            logIndex: log.index,
            blockNumber: String(log.blockNumber),
            payload: parsedLog.args,
          },
        },
      },
    });
  }

  private async handleCancelledEvent(parsedLog: LogDescription, log: Log, tx: Omit<PrismaClient, runtime.ITXClientDenyList>) {
    const [listingId, seller] = parsedLog.args;

    this.logger.log(`Cancelled Event - Listing ID: ${listingId}, Seller: ${seller}, TxHash: ${log.transactionHash}`);

    const txReceipt = await this.provider.getTransactionReceipt(log.transactionHash);

    await tx.listing.update({
      where: { onchainId: listingId, status: ListingStatus.ACTIVE },
      data: {
        status: ListingStatus.CANCELLED,
        listingEvents: {
          create: {
            eventName: ListingEventName.CANCELLED,
            txHash: log.transactionHash,
            logIndex: log.index,
            txReceipt: txReceipt?.toJSON(),
            blockNumber: String(log.blockNumber),
            payload: parsedLog.args,
          },
        },
      },
    });
  }

  private async handleBoughtEvent(parsedLog: LogDescription, log: Log, tx: Omit<PrismaClient, runtime.ITXClientDenyList>) {
    const [
      listingId,
      buyer,
      seller,
      price,
      paymentToken,
      marketFeeBps,
      marketFeeAmount,
      feeRecipient,
      royaltyReceiver,
      royaltyAmount,
      sellerProceeds,
    ] = parsedLog.args;

    this.logger.log(
      `Bought Event - Listing ID: ${listingId}, Buyer: ${buyer}, Seller: ${seller}, Price: ${price}, Payment Token: ${paymentToken}, Market Fee Bps: ${marketFeeBps}, Market Fee Amount: ${marketFeeAmount}, Fee Recipient: ${feeRecipient}, Royalty Receiver: ${royaltyReceiver}, Royalty Amount: ${royaltyAmount}, Seller Proceeds: ${sellerProceeds}, TxHash: ${log.transactionHash}`,
    );
    const txReceipt = await this.provider.getTransaction(log.transactionHash);

    await tx.listing.update({
      where: { onchainId: listingId, status: ListingStatus.ACTIVE },
      data: {
        status: ListingStatus.SOLD,
        buyerAddress: buyer,
        soldAt: new Date(),
        marketFeeBps: String(marketFeeBps),
        marketFeeAmount: String(marketFeeAmount),
        feeRecipient: feeRecipient,
        royaltyReceiver: royaltyReceiver,
        royaltyAmount: String(royaltyAmount),
        sellerProceeds: String(sellerProceeds),
        listingEvents: {
          create: {
            txReceipt: txReceipt?.toJSON(),
            eventName: ListingEventName.SOLD,
            txHash: log.transactionHash,
            logIndex: log.index,
            blockNumber: String(log.blockNumber),
            payload: parsedLog.args,
          },
        },
        token: {
          update: {
            ownerAddress: buyer,
          },
        },
      },
    });
  }
}
