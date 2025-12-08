import { forwardRef, Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Contract, ContractEventPayload } from 'ethers';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractsService } from '../../eth/contracts.service';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';
import { TokensListener } from '../tokens/tokens.listener';

@Injectable()
export class CollectionsListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CollectionsListener.name);
  private readonly contract: Contract;

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
    @Inject(forwardRef(() => TokensListener))
    private tokenListenerService: TokensListener,
  ) {
    this.contract = this.contracts.getContractWs('Factory');
  }

  async onModuleInit() {
    await this.contract.on('CollectionCreated', (creator: string, collection: string, transactionCode: string, event: ContractEventPayload) => {
      this.logger.log(`CollectionCreated: creator=${creator}, collection=${collection}, txCode=${transactionCode}`);

      void (async () => {
        await this.prisma.collection
          .update({
            where: { id: transactionCode, status: CollectionStatus.PENDING },
            data: {
              contractAddress: collection,
              txHash: event.log.transactionHash,
              status: CollectionStatus.CREATED,
            },
          })
          .catch(err => {
            this.logger.error(`Prisma update failed for collection ${transactionCode}: ${err?.message ?? String(err)}`);
          });

        await this.tokenListenerService.addCollectionListener(collection);
      })();
    });

    this.logger.log('CollectionCreated listener initialized');
  }

  onModuleDestroy() {
    try {
      if (this.contract && this.contract.removeAllListeners) {
        void this.contract.removeAllListeners('CollectionCreated');
      }
    } catch (e: any) {
      this.logger.error('Error during listener cleanup: ' + (e?.message ?? String(e)));
    }
  }
}
