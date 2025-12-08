import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Contract, ContractEventPayload } from 'ethers';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ListingStatus } from '../../../generated/prisma/enums.mjs';

@Injectable()
export class ListingsListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ListingsListener.name);
  private readonly marketplace: Contract;

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
  ) {
    this.marketplace = this.contracts.getContractWs('Marketplace');
  }

  async onModuleInit() {
    await this.marketplace.on(
      'Listed',
      (
        listingId: bigint,
        seller: string,
        nft: string,
        tokenId: bigint,
        price: number,
        paymentToken: string,
        transactionCode: string,
        event: ContractEventPayload,
      ) => {
        this.logger.log(
          `Listed: ${transactionCode} - Listing ID: ${listingId} - Seller: ${seller} - NFT: ${nft} - Token ID: ${tokenId} - Price: ${price} - Payment Token: ${paymentToken} - TxHash: ${event.log.transactionHash}`,
        );

        void (async () => {
          await this.prisma.listing
            .update({
              where: { id: transactionCode, status: ListingStatus.PENDING },
              data: {
                onchainId: listingId,
                txHash: event.log.transactionHash,
                status: ListingStatus.ACTIVE,
              },
            })
            .catch(err => {
              this.logger.error(`Prisma update failed for Listed ${transactionCode}: ${err?.message ?? String(err)}`);
            });
        })();
      },
    );

    await this.marketplace.on('Cancelled', (listingId: number, seller: string) => {
      this.logger.log(`Cancelled: Listing ID: ${listingId} - Seller: ${seller}`);

      void (async () => {
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
      })();
    });

    await this.marketplace.on(
      'Bought',
      (
        listingId: number,
        buyer: string,
        seller: string,
        price: number,
        paymentToken: string,
        marketFeeBps: bigint,
        marketFeeAmount: number,
        feeRecipient: string,
        royaltyReceiver: string,
        royaltyAmount: number,
        sellerProceeds: number,
      ) => {
        this.logger.log(
          `Bought: Listing ID: ${listingId} - Buyer: ${buyer} - Seller: ${seller} - Price: ${price} - Payment Token: ${paymentToken} - Market Fee Bps: ${marketFeeBps} - Market Fee Amount: ${marketFeeAmount} - Fee Recipient: ${feeRecipient} - Royalty Receiver: ${royaltyReceiver} - Royalty Amount: ${royaltyAmount} - Seller Proceeds: ${sellerProceeds}`,
        );

        void (async () => {
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
              },
            })
            .catch(err => {
              this.logger.error(`Prisma update failed for Bought Listing ID ${listingId}: ${err?.message ?? String(err)}`);
            });
        })();
      },
    );

    this.logger.log('Listing listener initialized');
  }

  onModuleDestroy() {
    try {
      if (this.marketplace && this.marketplace.removeAllListeners) {
        void this.marketplace.removeAllListeners();
      }
    } catch (e: any) {
      this.logger.error('Error during listener cleanup: ' + (e?.message ?? String(e)));
    }
  }
}
