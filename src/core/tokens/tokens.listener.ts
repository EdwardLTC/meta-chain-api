import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { id, Interface, Log, Provider } from 'ethers';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenStatus } from '../../../generated/prisma/enums.mjs';
import { ABI } from './tokens.abi';

@Injectable()
export class TokensListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TokensListener.name);
  private collectionAddresses: Set<string> = new Set();
  private provider: Provider;
  private readonly mintedEventTopic: string;

  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
  ) {
    this.provider = this.contracts.getWebSocketProvider();
    this.mintedEventTopic = id('Minted(address,uint256,string,string)');
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

    // Thêm địa chỉ mới vào filter
    this.collectionAddresses.add(collectionAddress);

    // Cập nhật filter cho listener
    await this.updateListenerFilter();

    this.logger.log(`Collection ${collectionAddress} added to global listener`);
  }

  async onModuleDestroy() {
    // Cleanup đơn giản hơn
    try {
      await this.provider.removeAllListeners();
    } catch (e: any) {
      this.logger.error('Error during listener cleanup: ' + (e?.message ?? String(e)));
    }
  }

  private async setupGlobalListener() {
    // Filter theo địa chỉ và event topic
    const filter = {
      address: Array.from(this.collectionAddresses),
      topics: [this.mintedEventTopic],
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await this.provider.on(filter, async (log: Log) => {
      await this.handleMintedEvent(log);
    });

    this.logger.log('Global listener setup completed');
  }

  private async handleMintedEvent(log: Log) {
    try {
      // Parse log sử dụng Interface chung
      const iface = new Interface(ABI);
      const parsedLog = iface.parseLog(log);

      if (!parsedLog) {
        this.logger.warn(`Failed to parse log: ${log.transactionHash}`);
        return;
      }

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

  private async updateListenerFilter() {
    // Xóa listener cũ
    await this.provider.removeAllListeners();

    // Tạo listener mới với filter cập nhật
    await this.setupGlobalListener();
  }
}
