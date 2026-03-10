import { forwardRef, Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Interface, InterfaceAbi, Log, LogDescription, WebSocketProvider } from 'ethers';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractsService } from '../../eth/contracts.service';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';
import { TokensListener } from '../tokens/tokens.listener';
import { EnvironmentService } from '../../environment/environment.service';
import { Prisma } from '@prisma/client';

const HEARTBEAT_INTERVAL_MS = 30_000;
const HEARTBEAT_TIMEOUT_MS = 10_000;

@Injectable()
export class CollectionsListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CollectionsListener.name);
  private provider: WebSocketProvider;
  private readonly factoryABI: InterfaceAbi;
  private readonly factoryAddress: string;
  private readonly collectionCreatedTopic: string;
  private readonly listenerId = 'CollectionsListener';
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private isReconnecting = false;

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
    private environmentService: EnvironmentService,
    @Inject(forwardRef(() => TokensListener))
    private tokenListenerService: TokensListener,
  ) {
    const factory = this.contracts.getContract('Factory');
    this.factoryABI = this.contracts.getAbi('Factory')!;
    this.factoryAddress = factory.target as string;
    this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
    this.collectionCreatedTopic = factory.interface.getEvent('CollectionCreated')!.topicHash;
  }

  async onModuleInit() {
    await this.replayMissedEvents();
    await this.setupGlobalListener();
    this.startHeartbeat();
  }

  async onModuleDestroy() {
    this.stopHeartbeat();
    await this.provider.destroy();
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(async () => {
      try {
        await Promise.race([
          this.provider.getBlockNumber(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Heartbeat timeout')), HEARTBEAT_TIMEOUT_MS)),
        ]);
      } catch (err) {
        this.logger.warn(`[${this.listenerId}] Heartbeat failed: ${err}`);
        await this.reconnect();
      }
    }, HEARTBEAT_INTERVAL_MS);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private async reconnect() {
    if (this.isReconnecting) return;
    this.isReconnecting = true;

    this.logger.warn(`[${this.listenerId}] Reconnecting WebSocket...`);
    this.stopHeartbeat();

    try {
      try {
        await this.provider.removeAllListeners();
        await this.provider.destroy();
      } catch (e) {
        this.logger.debug(`[${this.listenerId}] Error destroying old provider: ${e}`);
      }

      this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
      await this.replayMissedEvents();
      await this.setupGlobalListener();
      this.startHeartbeat();
      this.logger.log(`[${this.listenerId}] Reconnected successfully`);
    } catch (err) {
      this.logger.error(`[${this.listenerId}] Reconnect failed: ${err}`);
      setTimeout(async () => {
        this.isReconnecting = false;
        await this.reconnect();
      }, 5_000);
      return;
    }

    this.isReconnecting = false;
  }

  private async replayMissedEvents() {
    const cursor = await this.prisma.chainCursor.findUnique({
      where: {
        listenerId: this.listenerId,
      },
    });

    const latestBlock = await this.provider.getBlockNumber();

    if (!cursor) {
      await this.prisma.chainCursor.create({
        data: {
          listenerId: this.listenerId,
          lastBlock: String(latestBlock),
        },
      });

      this.logger.log(`[${this.listenerId}] Cursor initialized at block ${latestBlock}, skip replay`);
      return;
    }

    const fromBlock = BigInt(cursor.lastBlock) + 1n;
    if (fromBlock > BigInt(latestBlock)) return;

    const logs = await this.provider.getLogs({
      address: this.factoryAddress,
      fromBlock: fromBlock,
      toBlock: latestBlock,
      topics: [[this.collectionCreatedTopic]],
    });

    this.logger.log(`[${this.listenerId}] Replaying ${logs.length} logs from block ${fromBlock} → ${latestBlock}`);

    for (const log of logs) {
      await this.handleEvent(log);
    }
  }

  private async setupGlobalListener() {
    const filter = {
      address: this.factoryAddress,
      topics: [[this.collectionCreatedTopic]],
    };

    await this.provider.on(filter, async (log: Log) => {
      await this.handleEvent(log);
    });

    this.logger.log('CollectionCreated listener initialized');
  }

  private async handleEvent(log: Log) {
    const iface = new Interface(this.factoryABI);
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
          case 'CollectionCreated':
            await this.handleCollectionCreatedEvent(parsedLog, log, tx);
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

  private async handleCollectionCreatedEvent(parsedLog: LogDescription, log: Log, tx: Prisma.TransactionClient) {
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
