import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { SignContractDto } from './dtos/sign-contract.dto';
export declare class CollectionsController {
    private svc;
    constructor(svc: CollectionsService);
    getCollections(): Promise<{
        symbol: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).CollectionStatus;
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
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).CollectionStatus;
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
    create(dto: CreateCollectionDto, userWallet: string, userId: string): Promise<{
        symbol: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).CollectionStatus;
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
    signContract(dto: SignContractDto, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
