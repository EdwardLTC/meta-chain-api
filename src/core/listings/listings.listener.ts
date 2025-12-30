import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Interface, InterfaceAbi, Log, LogDescription, WebSocketProvider } from 'ethers';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MARKETPLACE_ADDRESS } from '../../ultils/constrain';
import { ListingStatus } from '../../../generated/prisma/enums.mjs';
import { EnvironmentService } from '../../environment/environment.service';

@Injectable()
export class ListingsListener implements OnModuleInit {
  private readonly logger = new Logger(ListingsListener.name);
  private readonly provider: WebSocketProvider;
  private readonly marketplaceABI: InterfaceAbi;
  private readonly listedTopic: string;
  private readonly cancelledTopic: string;
  private readonly boughtTopic: string;

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
    await this.setupGlobalListener();

    this.logger.log('Listing listener initialized');
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
    try {
      const iface = new Interface(this.marketplaceABI);
      const parsedLog = iface.parseLog(log);

      if (!parsedLog) {
        this.logger.warn(`Failed to parse log: ${log.transactionHash}`);
        return;
      }

      switch (parsedLog.name) {
        case 'Listed':
          await this.handleListedEvent(parsedLog, log);
          break;

        case 'Cancelled':
          await this.handleCancelledEvent(parsedLog, log);
          break;

        case 'Bought':
          await this.handleBoughtEvent(parsedLog, log);
          break;

        default:
          this.logger.warn(`Unknown event: ${parsedLog.name}`);
      }
    } catch (err: any) {
      this.logger.error(`Error handling event: ${err?.message ?? String(err)}`);
    }
  }

  private async handleListedEvent(parsedLog: LogDescription, log: Log) {
    const [listingId, seller, nft, tokenId, price, paymentToken, transactionCode] = parsedLog.args;

    this.logger.log(
      `Listed Event - Listing ID: ${listingId}, Seller: ${seller}, NFT: ${nft}, Token ID: ${tokenId}, Price: ${price}, Payment Token: ${paymentToken}, Transaction Code: ${transactionCode}, TxHash: ${log.transactionHash}`,
    );

    await this.prisma.listing
      .update({
        where: { id: transactionCode, status: ListingStatus.PENDING },
        data: {
          onchainId: listingId,
          txHash: log.transactionHash,
          status: ListingStatus.ACTIVE,
        },
      })
      .catch(err => {
        this.logger.error(`Prisma update failed for Listed ${transactionCode}: ${err?.message ?? String(err)}`);
      });
  }

  private async handleCancelledEvent(parsedLog: LogDescription, log: Log) {
    const [listingId, seller] = parsedLog.args;

    this.logger.log(`Cancelled Event - Listing ID: ${listingId}, Seller: ${seller}, TxHash: ${log.transactionHash}`);

    await this.prisma.listing
      .update({
        where: { onchainId: listingId, status: ListingStatus.ACTIVE },
        data: {
          status: ListingStatus.CANCELLED,
        },
      })
      .catch(err => {
        this.logger.error(`Prisma update failed for Cancelled Listing ID ${listingId}: ${err?.message ?? String(err)}`);
      });
  }

  private async handleBoughtEvent(parsedLog: LogDescription, log: Log) {
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

    await this.prisma.listing
      .update({
        where: { onchainId: listingId, status: ListingStatus.ACTIVE },
        data: {
          status: ListingStatus.SOLD,
          buyerAddress: buyer,
          soldAt: new Date(),
          marketFeeBps: marketFeeBps,
          marketFeeAmount: marketFeeAmount,
          feeRecipient: feeRecipient,
          royaltyReceiver: royaltyReceiver,
          royaltyAmount: royaltyAmount,
          sellerProceeds: sellerProceeds,
          token: {
            update: {
              ownerAddress: buyer,
            },
          },
        },
        select: {
          tokenId: true,
        },
      })
      .catch(err => {
        this.logger.error(`Prisma update failed for Bought Listing ID ${listingId}: ${err?.message ?? String(err)}`);
      });
  }
}
