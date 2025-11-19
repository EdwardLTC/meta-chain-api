import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractsService } from '../eth/contracts.service';
import { Contract, Log } from 'ethers';
import { CollectionStatus } from '../../generated/prisma/enums.mjs';

@Injectable()
export class CollectionsListenerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CollectionsListenerService.name);
  private CURSOR_ID = 'collectionCreated';
  private contract: Contract;

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.contract = this.contracts.getContract('Factory');

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await this.contract.on('CollectionCreated', async (creator: string, collection: string, transactionCode: string, event: Log) => {
      this.logger.log(`Event: creator=${creator}, collection=${collection}, txCode=${transactionCode}`);

      await this.prisma.collection.update({
        where: {
          id: transactionCode,
        },
        data: {
          contractAddress: collection,
          txHash: event.transactionHash,
          status: CollectionStatus.CREATED,
        },
      });

      return this;
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
