import { Injectable } from '@nestjs/common';
import { ContractsService } from '../eth/contracts.service';
import { PrismaService } from '../prisma/prisma.service';
import { CollectionStatus } from '../../generated/prisma/enums.mjs';
import { CreateCollectionDto } from './dtos/create.dto';
import { EthService } from '../eth/eth.service';

@Injectable()
export class CollectionsService {
  constructor(
    private contracts: ContractsService,
    private eth: EthService,
    private prisma: PrismaService,
  ) {}

  public async createCollection(createBody: CreateCollectionDto, creatorAddress: string, userId: string) {
    const create = await this.prisma.collection.create({
      data: {
        userId: userId,
        creatorAddress: creatorAddress,
        name: createBody.name,
        symbol: createBody.symbol,
        description: createBody.description,
        image: createBody.image,
        royaltyFeeBps: createBody.royaltyFeeBps,
        status: CollectionStatus.NEW,
      },
    });

    const factory = this.contracts.getContract('Factory');

    const txData = await factory.createCollection.populateTransaction(
      createBody.name,
      createBody.symbol,
      create.id,
      creatorAddress,
      createBody.royaltyFeeBps,
    );

    const update = await this.prisma.collection.update({
      where: { id: create.id },
      data: {
        status: CollectionStatus.PENDING,
      },
    });

    const metaTxData = await Promise.all([
      this.eth.getProvider().getTransactionCount(creatorAddress),
      this.eth.getProvider().getNetwork(),
      this.eth.getProvider().estimateGas({
        to: txData.to,
        data: txData.data,
        from: creatorAddress,
      }),
    ]);

    return {
      collection: update,
      txData: {
        ...txData,
        nonce: metaTxData[0].toString(),
        chainId: metaTxData[1].chainId.toString(),
        gasLimit: metaTxData[2].toString(),
      },
    };
  }

  public async getCollections() {
    return this.prisma.collection.findMany();
  }

  public async getCollection(id: string) {
    return this.prisma.collection.findUnique({ where: { id } });
  }

  public async testSignContract(txData: { to: string; data: string }, privateKey: string) {
    const wallet = await this.eth.getSigner(privateKey);

    return wallet.sendTransaction({
      to: txData.to,
      data: txData.data,
      gasLimit: 16777215,
      value: 0,
    });
  }
}
