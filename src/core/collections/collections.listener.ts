import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InterfaceAbi, Log, LogDescription } from 'ethers';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractsService } from '../../eth/contracts.service';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';
import { TokensListener } from '../tokens/tokens.listener';
import { EnvironmentService } from '../../environment/environment.service';
import { BaseChainListener, ListenerConfig, TxClient } from '../base-chain.listener';

@Injectable()
export class CollectionsListener extends BaseChainListener {
  private readonly factoryABI: InterfaceAbi;
  private readonly factoryAddress: string;
  private readonly collectionCreatedTopic: string;

  constructor(
    private contracts: ContractsService,
    prisma: PrismaService,
    environmentService: EnvironmentService,
    @Inject(forwardRef(() => TokensListener))
    private tokenListenerService: TokensListener,
  ) {
    super(prisma, environmentService);

    const factory = this.contracts.getContract('Factory');
    this.factoryABI = this.contracts.getAbi('Factory')!;
    this.factoryAddress = factory.target as string;
    this.collectionCreatedTopic = factory.interface.getEvent('CollectionCreated')!.topicHash;
  }

  protected getConfig(): ListenerConfig {
    return {
      listenerId: 'CollectionsListener',
      abi: this.factoryABI,
    };
  }

  protected getFilter() {
    return {
      address: this.factoryAddress,
      topics: [[this.collectionCreatedTopic]],
    };
  }

  protected async dispatchEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
    switch (parsedLog.name) {
      case 'CollectionCreated':
        await this.handleCollectionCreatedEvent(parsedLog, log, tx);
        break;
      default:
        this.logger.warn(`Unknown event: ${parsedLog.name}`);
    }
  }

  private async handleCollectionCreatedEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
    const [creator, collection, transactionCode] = parsedLog.args;

    this.logger.log(
      `CollectionCreated Event - Creator: ${creator}, Collection: ${collection}, TxCode: ${transactionCode}, TxHash: ${log.transactionHash}`,
    );

    await tx.collection.update({
      where: { id: transactionCode, status: CollectionStatus.PENDING },
      data: {
        contractAddress: collection,
        txHash: log.transactionHash,
        status: CollectionStatus.CREATED,
      },
    });

    await this.tokenListenerService.addCollectionListener(collection as string);
  }
}
