import { TokensService } from './tokens.service';
import { MintTokenDto } from './dtos/mint.dto';
import { SignTokenDto } from './dtos/sign-token.dto';
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
        contractAddress: string | null;
        txData: import("@prisma/client/runtime/client").JsonValue | null;
        collectionId: string;
        tokenId: string | null;
        ownerAddress: string;
        tokenUri: string;
        mintTxHash: string | null;
    }[]>;
    getToken(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).TokenStatus;
        name: string;
        description: string;
        image: string;
        contractAddress: string | null;
        txData: import("@prisma/client/runtime/client").JsonValue | null;
        collectionId: string;
        tokenId: string | null;
        ownerAddress: string;
        tokenUri: string;
        mintTxHash: string | null;
    }>;
    mintToken(data: MintTokenDto, walletAddress: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).TokenStatus;
        name: string;
        description: string;
        image: string;
        contractAddress: string | null;
        txData: import("@prisma/client/runtime/client").JsonValue | null;
        collectionId: string;
        tokenId: string | null;
        ownerAddress: string;
        tokenUri: string;
        mintTxHash: string | null;
    }>;
    signTokenDevOnly(tokenId: SignTokenDto, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
