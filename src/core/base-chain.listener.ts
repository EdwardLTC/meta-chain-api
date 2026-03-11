import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Interface, InterfaceAbi, Log, LogDescription, WebSocketProvider } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';
import { EnvironmentService } from '../environment/environment.service';
import { Prisma } from '@prisma/client';

const HEARTBEAT_INTERVAL_MS = 1_000 * 60 * 10;
const HEARTBEAT_TIMEOUT_MS = 10_000;
const RECONNECT_DELAY_MS = 5_000;

export type TxClient = Prisma.TransactionClient;

export interface ListenerConfig {
  /** Unique ID for cursor tracking and dedup */
  listenerId: string;
  /** ABI used to parse event logs */
  abi: InterfaceAbi;
}

/**
 * Abstract base class for blockchain event listeners.
 *
 * Handles all WebSocket lifecycle (heartbeat, reconnect, destroy),
 * event replay from cursor, dedup via processedLog, cursor upsert,
 * and dead-letter queue on failure.
 *
 * Subclasses only need to implement:
 *  - `getConfig()`        → listener ID + ABI
 *  - `getFilter()`        → address(es) + topic(s) for the subscription
 *  - `dispatchEvent()`    → route a parsed log to domain-specific handlers
 *  - optionally override `onBeforeStart()` for loading data before replay
 *  - optionally override `onAfterStart()` for extra work after init
 */
export abstract class BaseChainListener implements OnModuleInit, OnModuleDestroy {
  protected logger!: Logger;
  protected provider!: WebSocketProvider;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private isReconnecting = false;

  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly environmentService: EnvironmentService,
  ) {}

  private _config: ListenerConfig | null = null;

  /** Lazily resolved config — safe to call after constructor chain completes. */
  private get config(): ListenerConfig {
    if (!this._config) {
      this._config = this.getConfig();
      this.logger = new Logger(this._config.listenerId);
      this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
    }
    return this._config;
  }

  async onModuleInit() {
    void this.config;
    await this.onBeforeStart();
    await this.replayMissedEvents();
    await this.setupGlobalListener();
    this.startHeartbeat();
    await this.onAfterStart();
  }

  async onModuleDestroy() {
    this.stopHeartbeat();
    await this.provider.destroy();
  }

  /** Return static configuration (listenerId + ABI). */
  protected abstract getConfig(): ListenerConfig;

  /**
   * Return the filter for `provider.getLogs()` / `provider.on()`.
   * Called on every setup / reconnect so it can be dynamic.
   */
  protected abstract getFilter(): { address: string | string[]; topics: string[][] };

  /**
   * Route a parsed event to the appropriate domain handler.
   * Called inside a Prisma transaction — use the provided `tx` client.
   */
  protected abstract dispatchEvent(parsedLog: LogDescription, log: Log, tx: TxClient): Promise<void>;

  /** Optional hook that runs before replay + listen (e.g. load addresses). */
  protected async onBeforeStart(): Promise<void> {}

  /** Optional hook that runs after replay + listen + heartbeat are up. */
  protected async onAfterStart(): Promise<void> {}

  /** Remove all listeners and re-subscribe with the current filter. */
  protected async refreshListener() {
    await this.provider.removeAllListeners();
    await this.setupGlobalListener();
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
        this.logger.warn(`[${this.config.listenerId}] Heartbeat failed: ${err}`);
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

    this.logger.warn(`[${this.config.listenerId}] Reconnecting WebSocket...`);
    this.stopHeartbeat();

    try {
      try {
        await this.provider.removeAllListeners();
        await this.provider.destroy();
      } catch (e) {
        this.logger.debug(`[${this.config.listenerId}] Error destroying old provider: ${e}`);
      }

      this.provider = new WebSocketProvider(this.environmentService.ProviderWsNodeUrl);
      await this.replayMissedEvents();
      await this.setupGlobalListener();
      this.startHeartbeat();
      this.logger.log(`[${this.config.listenerId}] Reconnected successfully`);
    } catch (err) {
      this.logger.error(`[${this.config.listenerId}] Reconnect failed: ${err}`);
      setTimeout(async () => {
        this.isReconnecting = false;
        await this.reconnect();
      }, RECONNECT_DELAY_MS);
      return;
    }

    this.isReconnecting = false;
  }

  private async replayMissedEvents() {
    const { listenerId } = this.config;

    const cursor = await this.prisma.chainCursor.findUnique({
      where: { listenerId },
    });

    const latestBlock = await this.provider.getBlockNumber();

    if (!cursor) {
      await this.prisma.chainCursor.create({
        data: { listenerId, lastBlock: String(latestBlock) },
      });
      this.logger.log(`[${listenerId}] Cursor initialized at block ${latestBlock}, skip replay`);
      return;
    }

    const fromBlock = BigInt(cursor.lastBlock) + 1n;
    if (fromBlock > BigInt(latestBlock)) return;

    const filter = this.getFilter();

    // Skip replay if no addresses to listen on (e.g. tokens with 0 collections)
    const addr = filter.address;
    if (Array.isArray(addr) && addr.length === 0) return;

    const logs = await this.provider.getLogs({
      ...filter,
      fromBlock,
      toBlock: latestBlock,
    });

    this.logger.log(`[${listenerId}] Replaying ${logs.length} logs from block ${fromBlock} → ${latestBlock}`);

    for (const log of logs) {
      await this.handleEvent(log);
    }
  }

  private async setupGlobalListener() {
    const filter = this.getFilter();

    await this.provider.on(filter, async (log: Log) => {
      await this.handleEvent(log);
    });

    this.logger.log(`[${this.config.listenerId}] Listener initialized`);
  }

  private async handleEvent(log: Log) {
    const { listenerId, abi } = this.config;
    const iface = new Interface(abi);
    const parsedLog = iface.parseLog(log);

    if (!parsedLog) {
      this.logger.warn(`Failed to parse log: ${log.transactionHash}`);
      return;
    }

    try {
      const existed = await this.prisma.processedLog.findUnique({
        where: {
          listenerId_txHash_logIndex: {
            listenerId,
            txHash: log.transactionHash,
            logIndex: log.index,
          },
        },
      });

      if (existed) return;

      await this.prisma.$transaction(async tx => {
        await this.dispatchEvent(parsedLog, log, tx);

        await tx.processedLog.create({
          data: {
            listenerId,
            txHash: log.transactionHash,
            logIndex: log.index,
          },
        });

        await tx.chainCursor.upsert({
          where: { listenerId },
          create: { listenerId, lastBlock: String(log.blockNumber) },
          update: { lastBlock: String(log.blockNumber) },
        });
      });
    } catch (err: any) {
      this.logger.error(`Error handling event: ${err?.message ?? String(err)}`);

      try {
        await this.prisma.deadLetterEvent.upsert({
          where: {
            listenerId_txHash_logIndex: {
              listenerId,
              txHash: log.transactionHash,
              logIndex: log.index,
            },
          },
          create: {
            listenerId,
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
        this.logger.error(`[${listenerId}] Failed to write DLQ for tx=${log.transactionHash}`, dlqErr);
      }
    }
  }
}
