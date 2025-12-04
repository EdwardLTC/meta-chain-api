import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { GetCollectionsQuery } from './dtos/get-collections.dto';
export declare class CollectionsController {
    private svc;
    constructor(svc: CollectionsService);
    getCollections(getCollectionsQuery: GetCollectionsQuery, userId: string): Promise<{
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
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
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
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
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
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
    }>;
}
