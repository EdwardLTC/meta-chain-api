import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { id, Interface, Log, LogDescription, WebSocketProvider } from 'ethers';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenStatus } from '../../../generated/prisma/enums.mjs';
import { ABI } from './tokens.abi';
import { EnvironmentService } from '../../environment/environment.service';

@Injectable()
export class TokensListener implements OnModuleInit {
  private readonly logger = new Logger(TokensListener.name);
  private collectionAddresses: Set<string> = new Set();
  private provider: WebSocketProvider;
  private readonly mintedEventTopic: string;
  private readonly royaltySetEventTopic: string;

  constructor(
    private prisma: PrismaService,
    private environmentService: EnvironmentService,
  ) {
    this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
    this.mintedEventTopic = id('Minted(address,uint256,string,string)');
    this.royaltySetEventTopic = id('RoyaltySet(address,uint96,string)');
  }

  async onModuleInit() {
    const collections = await this.prisma.collection.findMany({
      where: { contractAddress: { not: null } },
    });

    for (const col of collections) {
      this.collectionAddresses.add(col.contractAddress!);
    }

    await this.setupGlobalListener();

    this.logger.log(`TokensListener initialized for ${this.collectionAddresses.size} collections`);
  }

  public async addCollectionListener(collectionAddress: string) {
    if (this.collectionAddresses.has(collectionAddress)) {
      this.logger.debug(`Collection already in listener: ${collectionAddress}`);
      return;
    }

    this.collectionAddresses.add(collectionAddress);

    await this.updateListenerFilter();

    this.logger.log(`Collection ${collectionAddress} added to global listener`);
  }

  private async setupGlobalListener() {
    const filter = {
      address: Array.from(this.collectionAddresses),
      topics: [[this.mintedEventTopic, this.royaltySetEventTopic]],
    };

    await this.provider.on(filter, async (log: Log) => {
      await this.handleEvent(log);
    });

    this.logger.log('Global listener setup completed');
  }

  private async handleEvent(log: Log) {
    try {
      const iface = new Interface(ABI);
      const parsedLog = iface.parseLog(log);

      if (!parsedLog) {
        this.logger.warn(`Failed to parse log: ${log.transactionHash}`);
        return;
      }

      switch (parsedLog.name) {
        case 'Minted':
          await this.handleMintedEvent(parsedLog, log);
          break;

        case 'RoyaltySet':
          await this.handleRoyaltySet(parsedLog);
          break;

        default:
          this.logger.warn(`Unknown event: ${parsedLog.name}`);
      }
    } catch (err: any) {
      this.logger.error(`Error handling event: ${err?.message ?? String(err)}`);
    }
  }

  private async handleMintedEvent(parsedLog: LogDescription, log: Log) {
    try {
      const { to, tokenId, uri, transactionCode } = parsedLog.args;
      this.logger.log(`Minted: to=${to}, tokenId=${tokenId}, uri=${uri}, txCode=${transactionCode}`);

      await this.prisma.token.update({
        where: { id: transactionCode, status: TokenStatus.PENDING },
        data: {
          status: TokenStatus.MINTED,
          onchainId: tokenId,
          txHash: log.transactionHash,
        },
      });
    } catch (err: any) {
      this.logger.error(`Error handling minted event: ${err?.message ?? String(err)}`);
    }
  }

  private async handleRoyaltySet(parsedLog: LogDescription) {
    try {
      const { recipient, bps, transactionCode } = parsedLog.args;
      this.logger.log(`RoyaltySet: to=${recipient}, royaltyBps=${bps}, transactionCode=${transactionCode}`);
      await this.prisma.collection.update({
        where: { id: transactionCode },
        data: {
          royaltyFeeBps: Number(bps),
        },
      });
    } catch (err: any) {
      this.logger.error(`Error handling royalty set event: ${err?.message ?? String(err)}`);
    }
  }

  private async updateListenerFilter() {
    await this.provider.removeAllListeners();
    await this.setupGlobalListener();
  }
}
