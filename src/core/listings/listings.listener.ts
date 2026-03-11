import { Injectable } from '@nestjs/common';
import { InterfaceAbi, Log, LogDescription } from 'ethers';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MARKETPLACE_ADDRESS } from '../../ultils/constrain';
import { ListingEventName, ListingStatus } from '../../../generated/prisma/enums.mjs';
import { EnvironmentService } from '../../environment/environment.service';
import { BaseChainListener, ListenerConfig, TxClient } from '../base-chain.listener';

@Injectable()
export class ListingsListener extends BaseChainListener {
  private readonly marketplaceABI: InterfaceAbi;
  private readonly listedTopic: string;
  private readonly cancelledTopic: string;
  private readonly boughtTopic: string;

  constructor(
    private contracts: ContractsService,
    prisma: PrismaService,
    environmentService: EnvironmentService,
  ) {
    super(prisma, environmentService);

    const marketplace = this.contracts.getContract('Marketplace');
    this.marketplaceABI = this.contracts.getAbi('Marketplace')!;
    this.listedTopic = marketplace.interface.getEvent('Listed')!.topicHash;
    this.cancelledTopic = marketplace.interface.getEvent('Cancelled')!.topicHash;
    this.boughtTopic = marketplace.interface.getEvent('Bought')!.topicHash;
  }

  protected getConfig(): ListenerConfig {
    return {
      listenerId: 'ListingsListener',
      abi: this.marketplaceABI,
    };
  }

  protected getFilter() {
    return {
      address: MARKETPLACE_ADDRESS,
      topics: [[this.listedTopic, this.cancelledTopic, this.boughtTopic]],
    };
  }

  protected async dispatchEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
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
  }

  private async handleListedEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
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

  private async handleCancelledEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
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

  private async handleBoughtEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
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
