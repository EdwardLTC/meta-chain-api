import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dtos/create.dto';
import { ContractsService } from 'src/eth/contracts.service';
import { EthService } from 'src/eth/eth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputJsonValue, PrismaClientKnownRequestError } from '@prisma/client/runtime/edge';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';

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

    return this.prisma.collection.update({
      where: { id: create.id },
      data: {
        status: CollectionStatus.PENDING,
        txData: txData as unknown as InputJsonValue,
      },
    });
  }

  public async getCollections() {
    return this.prisma.collection.findMany({ where: { status: CollectionStatus.CREATED } });
  }

  public async getCollection(id: string) {
    return this.prisma.collection.findUniqueOrThrow({ where: { id } }).catch(err => {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new NotFoundException('Collection not found');
      }

      throw err;
    });
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
