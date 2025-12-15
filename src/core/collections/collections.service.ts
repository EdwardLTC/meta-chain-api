import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dtos/create.dto';
import { ContractsService } from 'src/eth/contracts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputJsonValue, PrismaClientKnownRequestError } from '@prisma/client/runtime/edge';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';
import { uuidv7 } from '../../ultils/uuid';
import { GetCollectionsQuery } from './dtos/get-collections.dto';
import { Contract } from 'ethers';
import { ABI } from '../tokens/tokens.abi';
import { MARKETPLACE_ADDRESS } from '../../ultils/constrain';

@Injectable()
export class CollectionsService {
  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
  ) {}

  public async createCollection(createBody: CreateCollectionDto, creatorAddress: string, userId: string) {
    const factory = this.contracts.getContract('Factory');

    const id = uuidv7();

    const txData = await factory.createCollection.populateTransaction(
      createBody.name,
      createBody.symbol,
      id,
      creatorAddress,
      createBody.royaltyFeeBps,
    );

    return this.prisma.collection.create({
      data: {
        id: id,
        userId: userId,
        creatorAddress: creatorAddress,
        name: createBody.name,
        symbol: createBody.symbol,
        description: createBody.description,
        image: createBody.image,
        royaltyFeeBps: createBody.royaltyFeeBps,
        status: CollectionStatus.PENDING,
        txData: txData as unknown as InputJsonValue,
      },
    });
  }

  public async getCollections(getCollectionsQuery: GetCollectionsQuery, userId: string) {
    return this.prisma.collection.findMany({
      where: {
        ...(getCollectionsQuery.isMe ? { userId: userId } : { status: CollectionStatus.CREATED }),
      },
    });
  }

  public async getCollection(id: string) {
    return this.prisma.collection.findUniqueOrThrow({ where: { id } }).catch(err => {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new NotFoundException('Collection not found');
      }

      throw err;
    });
  }

  public async updateRoyaltyInfo(collectionId: string, royaltyFeeBps: number) {
    const collection = await this.getCollection(collectionId);

    if (collection.status !== CollectionStatus.CREATED) {
      throw new NotFoundException('Collection not found or not created yet');
    }

    const contract = new Contract(collection.contractAddress!, ABI, this.contracts.getProvider());

    return contract.setRoyalty.populateTransaction(collection.creatorAddress, royaltyFeeBps, collection.id);
  }

  public async isCollectionApprovedForMarketplace(id: string, ownerAddress: string): Promise<boolean> {
    const collection = await this.getCollection(id);

    if (collection.status !== CollectionStatus.CREATED) {
      throw new NotFoundException('Collection not found or not created yet');
    }

    if (collection.creatorAddress !== ownerAddress) {
      throw new ForbiddenException('You are not the owner of this collection');
    }

    const contract = new Contract(collection.contractAddress!, ABI, this.contracts.getProvider());

    return contract.isApprovedForAll(ownerAddress, MARKETPLACE_ADDRESS);
  }

  public async approveCollectionForMarketplace(collectionAddress: string) {
    const contract = new Contract(collectionAddress, ABI, this.contracts.getProvider());

    return contract.setApprovalForAll.populateTransaction(MARKETPLACE_ADDRESS, true);
  }
}
