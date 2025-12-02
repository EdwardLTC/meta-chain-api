import { PrismaService } from '../../prisma/prisma.service';
import { CreateListingDto } from './dtos/create.dto';
import { TokensService } from '../tokens/tokens.service';
import { ContractsService } from '../../eth/contracts.service';
import { ListingStatus } from '../../../generated/prisma/enums.mjs';
export declare class ListingsService {
    private readonly dbService;
    private readonly tokenService;
    private contracts;
    constructor(dbService: PrismaService, tokenService: TokensService, contracts: ContractsService);
    createListing(data: CreateListingDto, userAddress: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: ListingStatus;
        txData: import("@prisma/client/runtime/client").JsonValue;
        txHash: string | null;
        onchainId: number | null;
        tokenId: string;
        sellerAddress: string;
        price: import("@prisma/client/runtime/client").Decimal;
        expiresAt: Date | null;
        buyerAddress: string | null;
        paymentToken: string | null;
        soldAt: Date | null;
        marketFeeBps: number | null;
        marketFeeAmount: import("@prisma/client/runtime/client").Decimal | null;
        feeRecipient: string | null;
        royaltyReceiver: string | null;
        royaltyAmount: import("@prisma/client/runtime/client").Decimal | null;
        sellerProceeds: import("@prisma/client/runtime/client").Decimal | null;
    }>;
}
