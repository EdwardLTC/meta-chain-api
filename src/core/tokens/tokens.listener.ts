import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { id, Interface, Log, LogDescription, WebSocketProvider } from 'ethers';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenStatus } from '../../../generated/prisma/enums.mjs';
import { ABI } from './tokens.abi';
import { EnvironmentService } from '../../environment/environment.service';
import { PrismaClient } from '../../../generated/prisma/client.mjs';
import * as runtime from '@prisma/client/runtime/client';

@Injectable()
export class TokensListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TokensListener.name);
  private collectionAddresses: Set<string> = new Set();
  private provider: WebSocketProvider;
  private readonly mintedEventTopic: string;
  private readonly royaltySetEventTopic: string;
  private readonly listenerId = 'TokensListener';

  constructor(
    private prisma: PrismaService,
    private environmentService: EnvironmentService,
  ) {
    this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
    this.mintedEventTopic = id('Minted(address,uint256,string,string)');
    this.royaltySetEventTopic = id('RoyaltySet(address,uint96,string)');
  }

  async onModuleInit() {
    await this.replayMissedEvents();
    const collections = await this.prisma.collection.findMany({
      where: { contractAddress: { not: null } },
    });

    for (const col of collections) {
      this.collectionAddresses.add(col.contractAddress!);
    }

    await this.setupGlobalListener();

    this.logger.log(`TokensListener initialized for ${this.collectionAddresses.size} collections`);
  }

  async onModuleDestroy() {
    await this.provider.destroy();
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

  private async replayMissedEvents() {
    const cursor = await this.prisma.chainCursor.findUnique({
      where: { listenerId: this.listenerId },
    });

    const latestBlock = await this.provider.getBlockNumber();

    if (!cursor) {
      await this.prisma.chainCursor.create({
        data: {
          listenerId: this.listenerId,
          lastBlock: String(latestBlock),
        },
      });

      this.logger.log(`[${this.listenerId}] Cursor initialized at ${latestBlock}`);
      return;
    }

    const fromBlock = BigInt(cursor.lastBlock) + 1n;
    if (fromBlock > BigInt(latestBlock)) return;

    const collections = await this.prisma.collection.findMany({
      where: { contractAddress: { not: null } },
      select: { contractAddress: true },
    });

    const addresses = collections.map(c => c.contractAddress!);
    if (addresses.length === 0) return;

    const logs = await this.provider.getLogs({
      address: addresses,
      fromBlock: fromBlock,
      toBlock: latestBlock,
      topics: [[this.mintedEventTopic, this.royaltySetEventTopic]],
    });

    this.logger.log(`[${this.listenerId}] Replaying ${logs.length} logs (${fromBlock} → ${latestBlock})`);

    for (const log of logs) {
      await this.handleEvent(log);
    }
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
    const iface = new Interface(ABI);
    const parsedLog = iface.parseLog(log);

    if (!parsedLog) {
      this.logger.warn(`Failed to parse log: ${log.transactionHash}`);
      return;
    }

    try {
      const existed = await this.prisma.processedLog.findUnique({
        where: {
          listenerId_txHash_logIndex: {
            listenerId: this.listenerId,
            txHash: log.transactionHash,
            logIndex: log.index,
          },
        },
      });

      if (existed) return;

      await this.prisma.$transaction(async tx => {
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
        await tx.processedLog.create({
          data: {
            listenerId: this.listenerId,
            txHash: log.transactionHash,
            logIndex: log.index,
          },
        });

        await tx.chainCursor.upsert({
          where: {
            listenerId: this.listenerId,
          },
          create: {
            listenerId: this.listenerId,
            lastBlock: String(log.blockNumber),
          },
          update: {
            lastBlock: String(log.blockNumber),
          },
        });
      });
    } catch (err: any) {
      this.logger.error(`Error handling event: ${err?.message ?? String(err)}`);

      try {
        await this.prisma.deadLetterEvent.upsert({
          where: {
            listenerId_txHash_logIndex: {
              listenerId: this.listenerId,
              txHash: log.transactionHash,
              logIndex: log.index,
            },
          },
          create: {
            listenerId: this.listenerId,
            eventName: parsedLog?.name ?? 'UNKNOWN',
            txHash: log.transactionHash,
            logIndex: log.index,
            blockNumber: String(log.blockNumber),
            payload: parsedLog?.args ?? {},
            errorMessage: err?.message ?? String(err),
          },
          update: {
            retryCount: { increment: 1 },
            errorMessage: err?.message ?? String(err),
          },
        });
      } catch (dlqErr) {
        this.logger.error(`[${this.listenerId}] Failed to write DLQ for tx=${log.transactionHash}`, dlqErr);
      }
    }
  }

  private async handleMintedEvent(parsedLog: LogDescription, log: Log, tx: Omit<PrismaClient, runtime.ITXClientDenyList>) {
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

  private async handleRoyaltySet(parsedLog: LogDescription, tx: Omit<PrismaClient, runtime.ITXClientDenyList>) {
    const { recipient, bps, transactionCode } = parsedLog.args;
    this.logger.log(`RoyaltySet: to=${recipient}, royaltyBps=${bps}, transactionCode=${transactionCode}`);
    await tx.collection.update({
      where: { id: transactionCode },
      data: {
        royaltyFeeBps: Number(bps),
      },
    });
  }

  private async updateListenerFilter() {
    await this.provider.removeAllListeners();
    await this.setupGlobalListener();
  }
}
