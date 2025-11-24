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
        status: import("../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).CollectionStatus;
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
        status: import("../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).CollectionStatus;
        userId: string;
        creatorAddress: string;
        name: string;
        description: string;
        image: string;
        royaltyFeeBps: number;
        txHash: string | null;
        contractAddress: string | null;
    } | null>;
    create(dto: CreateCollectionDto, userWallet: string, userId: string): Promise<{
        collection: {
            symbol: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).CollectionStatus;
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
    signContract(dto: SignContractDto, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
