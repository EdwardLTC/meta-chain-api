import { Injectable, Logger } from '@nestjs/common';
import { ContractsService } from '../eth/contracts.service';
import { PrismaService } from '../prisma/prisma.service';
import { CollectionStatus } from '../../generated/prisma/enums.mjs';
import { CreateCollectionDto } from './dtos/create.dto';
import { EthService } from '../eth/eth.service';

@Injectable()
export class CollectionsService {
  private readonly logger = new Logger(CollectionsService.name);

  constructor(
    private contracts: ContractsService,
    private eth: EthService,
    private prisma: PrismaService,
  ) {}

  public async createCollection(createBody: CreateCollectionDto, creatorAddress: string) {
    const create = await this.prisma.collection.create({
      data: {
        createdBy: creatorAddress,
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

    return {
      collection: update,
      txData: txData,
    };
  }

  public async testSignContract(txData: { to: string; data: string }) {
    const wallet = await this.eth.getSigner(0);

    return wallet.sendTransaction({
      to: txData.to,
      data: txData.data,
      gasLimit: 30000000,
      value: 0,
    });
  }
}
