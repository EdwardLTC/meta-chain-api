import { CreateCollectionDto } from './dtos/create.dto';
import { ContractsService } from 'src/eth/contracts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';
import { GetCollectionsQuery } from './dtos/get-collections.dto';
export declare class CollectionsService {
    private contracts;
    private prisma;
    constructor(contracts: ContractsService, prisma: PrismaService);
    createCollection(createBody: CreateCollectionDto, creatorAddress: string, userId: string): Promise<{
        symbol: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: CollectionStatus;
        userId: string;
        creatorAddress: string;
        name: string;
        description: string;
        image: string;
        royaltyFeeBps: number;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
    }>;
    getCollections(getCollectionsQuery: GetCollectionsQuery, userId: string): Promise<{
        symbol: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: CollectionStatus;
        userId: string;
        creatorAddress: string;
        name: string;
        description: string;
        image: string;
        royaltyFeeBps: number;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
    }[]>;
    getCollection(id: string): Promise<{
        symbol: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: CollectionStatus;
        userId: string;
        creatorAddress: string;
        name: string;
        description: string;
        image: string;
        royaltyFeeBps: number;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
    }>;
}
