import { CreateCollectionDto } from './dtos/create.dto';
import { ContractsService } from 'src/eth/contracts.service';
import { EthService } from 'src/eth/eth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectionStatus } from '../../../generated/prisma/enums.mjs';
export declare class CollectionsService {
    private contracts;
    private eth;
    private prisma;
    constructor(contracts: ContractsService, eth: EthService, prisma: PrismaService);
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
        txHash: string | null;
        contractAddress: string | null;
        txData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    getCollections(): Promise<{
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
        txHash: string | null;
        contractAddress: string | null;
        txData: import("@prisma/client/runtime/client").JsonValue | null;
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
        txHash: string | null;
        contractAddress: string | null;
        txData: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    testSignContract(txData: {
        to: string;
        data: string;
    }, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
