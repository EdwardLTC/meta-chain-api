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
        collectionId: string;
        tokenId: string | null;
        ownerAddress: string;
        tokenUri: string;
        mintTxHash: string | null;
    }>;
    mintToken(data: MintTokenDto, walletAddress: string, userId: string): Promise<{
        token: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../../generated/prisma/enums.mjs", { with: { "resolution-mode": "import" } }).TokenStatus;
            name: string;
            description: string;
            image: string;
            contractAddress: string | null;
            collectionId: string;
            tokenId: string | null;
            ownerAddress: string;
            tokenUri: string;
            mintTxHash: string | null;
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
    signTokenDevOnly(tokenId: SignTokenDto, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
