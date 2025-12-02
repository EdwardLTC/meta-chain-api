import { TokensService } from './tokens.service';
import { MintTokenDto } from './dtos/mint.dto';
import { GetTokensFilterDto } from './dtos/get-tokens-filter.dto';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    getTokens(filter: GetTokensFilterDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).TokenStatus;
        name: string;
        description: string;
        image: string;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
        collectionId: string;
        ownerAddress: string;
        tokenUri: string;
        onchainId: number | null;
    }[]>;
    getToken(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).TokenStatus;
        name: string;
        description: string;
        image: string;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
        collectionId: string;
        ownerAddress: string;
        tokenUri: string;
        onchainId: number | null;
    }>;
    mintToken(data: MintTokenDto, walletAddress: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).TokenStatus;
        name: string;
        description: string;
        image: string;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        contractAddress: string | null;
        collectionId: string;
        ownerAddress: string;
        tokenUri: string;
        onchainId: number | null;
    }>;
}
