import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractsService } from '../eth/contracts.service';
import { Contract, Log } from 'ethers';
import { CollectionStatus } from '../../generated/prisma/enums.mjs';

@Injectable()
export class CollectionsListenerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CollectionsListenerService.name);
  private readonly contract: Contract;

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
  ) {
    this.contract = this.contracts.getContract('Factory');
  }

  async onModuleInit() {
    await this.contract.on('CollectionCreated', (creator: string, collection: string, transactionCode: string, event: Log) => {
      this.logger.log(`Event: creator=${creator}, collection=${collection}, txCode=${transactionCode}`);

      void (async () => {
        await this.prisma.collection
          .update({
            where: { id: transactionCode, status: CollectionStatus.PENDING },
            data: {
              contractAddress: collection,
              txHash: event.transactionHash,
              status: CollectionStatus.CREATED,
            },
          })
          .catch(err => {
            this.logger.error(`Prisma update failed for collection ${transactionCode}: ${err?.message ?? String(err)}`);
          });
      })();
    });

    this.logger.log('CollectionCreated listener initialized');
  }

  onModuleDestroy() {
    try {
      if (this.contract && this.contract.removeAllListeners) {
        void this.contract.removeAllListeners('CollectionCreated');
      }
      const provider = this.contracts.getProvider();
      if (provider && provider.removeAllListeners) {
        void provider.removeAllListeners();
      }
    } catch (e: any) {
      this.logger.error('Error during listener cleanup: ' + (e?.message ?? String(e)));
    }
  }
}
