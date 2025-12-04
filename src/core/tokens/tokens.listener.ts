import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Contract, ContractEventPayload } from 'ethers';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenStatus } from '../../../generated/prisma/enums.mjs';
import { ABI } from './tokens.abi';

@Injectable()
export class TokensListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TokensListener.name);
  private readonly factoryContract: Contract;
  private collectionContracts: Map<string, Contract> = new Map();

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
  ) {
    this.factoryContract = this.contracts.getContractWs('Factory');
  }

  async onModuleInit() {
    const collections = await this.prisma.collection.findMany({
      where: { contractAddress: { not: null } },
    });

    for (const col of collections) {
      await this.addCollectionListener(col.contractAddress!);
    }

    this.logger.log('TokensListenerService initialized');
  }

  onModuleDestroy() {
    try {
      for (const contract of this.collectionContracts.values()) {
        if (contract && contract.removeAllListeners) {
          void contract.removeAllListeners('Minted');
        }
      }
      this.collectionContracts.clear();

      if (this.factoryContract && this.factoryContract.removeAllListeners) {
        void this.factoryContract.removeAllListeners('CollectionCreated');
      }

      const provider = this.contracts.getProvider();
      if (provider && provider.removeAllListeners) {
        void provider.removeAllListeners();
      }
    } catch (e: any) {
      this.logger.error('Error during listener cleanup: ' + (e?.message ?? String(e)));
    }
  }

  public async addCollectionListener(collectionAddress: string) {
    if (this.collectionContracts.has(collectionAddress)) {
      this.logger.debug(`Collection listener already exists for ${collectionAddress}`);
      return;
    }

    const contract = new Contract(collectionAddress, ABI, this.contracts.getProvider());
    this.collectionContracts.set(collectionAddress, contract);

    await contract.on('Minted', (to: string, tokenId: bigint, uri: string, transactionCode: string, event: ContractEventPayload) => {
      this.logger.log(`Minted: to=${to}, tokenId=${tokenId}, uri=${uri}, txCode=${transactionCode}`);

      void (async () => {
        try {
          await this.prisma.token.update({
            where: { id: transactionCode, status: TokenStatus.PENDING },
            data: {
              status: TokenStatus.MINTED,
              onchainId: tokenId,
              txHash: event.log.transactionHash,
            },
          });
        } catch (err: any) {
          this.logger.error(`Prisma update failed for token ${transactionCode}: ${err?.message ?? String(err)}`);
        }
      })();
    });

    this.logger.log(`Listener added for collection ${collectionAddress}`);
  }
}
