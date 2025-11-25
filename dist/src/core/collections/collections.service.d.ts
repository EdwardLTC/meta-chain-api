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
        collection: {
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
        };
        txData: {
            nonce: string;
            chainId: string;
            gasLimit: string;
            to: string;
            data: string;
            from?: string;
            type?: number;
            gasPrice?: bigint;
            maxPriorityFeePerGas?: bigint;
            maxFeePerGas?: bigint;
            value?: bigint;
            accessList?: import("ethers").AccessList;
            authorizationList?: Array<import("ethers").Authorization>;
            customData?: any;
            blockTag?: import("ethers").BlockTag;
            enableCcipRead?: boolean;
        };
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
    }>;
    testSignContract(txData: {
        to: string;
        data: string;
    }, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
