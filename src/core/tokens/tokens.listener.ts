import { Injectable } from '@nestjs/common';
import { id, Log, LogDescription } from 'ethers';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenStatus } from '../../../generated/prisma/enums.mjs';
import { ABI } from './tokens.abi';
import { EnvironmentService } from '../../environment/environment.service';
import { BaseChainListener, ListenerConfig, TxClient } from '../base-chain.listener';

@Injectable()
export class TokensListener extends BaseChainListener {
  private collectionAddresses: Set<string> = new Set();
  private readonly mintedEventTopic: string;
  private readonly royaltySetEventTopic: string;

  constructor(prisma: PrismaService, environmentService: EnvironmentService) {
    super(prisma, environmentService);

    this.mintedEventTopic = id('Minted(address,uint256,string,string)');
    this.royaltySetEventTopic = id('RoyaltySet(address,uint96,string)');
  }

  public async addCollectionListener(collectionAddress: string) {
    if (this.collectionAddresses.has(collectionAddress)) {
      this.logger.debug(`Collection already in listener: ${collectionAddress}`);
      return;
    }

    this.collectionAddresses.add(collectionAddress);
    await this.refreshListener();

    this.logger.log(`Collection ${collectionAddress} added to global listener`);
  }

  protected getConfig(): ListenerConfig {
    return {
      listenerId: 'TokensListener',
      abi: ABI,
    };
  }

  protected getFilter() {
    return {
      address: Array.from(this.collectionAddresses),
      topics: [[this.mintedEventTopic, this.royaltySetEventTopic]],
    };
  }

  protected override async onBeforeStart() {
    const collections = await this.prisma.collection.findMany({
      where: { contractAddress: { not: null } },
    });

    for (const col of collections) {
      this.collectionAddresses.add(col.contractAddress!);
    }

    this.logger.log(`TokensListener initialized for ${this.collectionAddresses.size} collections`);
  }

  protected async dispatchEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
    switch (parsedLog.name) {
      case 'Minted':
        await this.handleMintedEvent(parsedLog, log, tx);
        break;
      case 'RoyaltySet':
        await this.handleRoyaltySet(parsedLog, tx);
        break;
      default:
        this.logger.warn(`Unknown event: ${parsedLog.name}`);
    }
  }

  private async handleMintedEvent(parsedLog: LogDescription, log: Log, tx: TxClient) {
    const { to, tokenId, uri, transactionCode } = parsedLog.args;
    this.logger.log(`Minted: to=${to}, tokenId=${tokenId}, uri=${uri}, txCode=${transactionCode}`);

    await tx.token.update({
      where: { id: transactionCode, status: TokenStatus.PENDING },
      data: {
        status: TokenStatus.MINTED,
        onchainId: tokenId,
        txHash: log.transactionHash,
      },
    });
  }

  private async handleRoyaltySet(parsedLog: LogDescription, tx: TxClient) {
    const { recipient, bps, transactionCode } = parsedLog.args;
    this.logger.log(`RoyaltySet: to=${recipient}, royaltyBps=${bps}, transactionCode=${transactionCode}`);
    await tx.collection.update({
      where: { id: transactionCode },
      data: {
        royaltyFeeBps: Number(bps),
      },
    });
  }
}
