import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListingDto } from './dtos/create.dto';
import { TokensService } from '../tokens/tokens.service';
import { ContractsService } from '../../eth/contracts.service';
import { ListingStatus } from '../../../generated/prisma/enums.mjs';
import { uuidv7 } from '../../ultils/uuid';
import { InputJsonValue } from '@prisma/client/runtime/edge';

@Injectable()
export class ListingsService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly tokenService: TokensService,
    private contracts: ContractsService,
  ) {}

  public async createListing(data: CreateListingDto, userAddress: string) {
    const token = await this.tokenService.getToken(data.tokenId);

    if (token.ownerAddress !== userAddress) {
      throw new ForbiddenException('You do not own this token');
    }

    const isExistingListing = await this.dbService.listing.findFirst({
      where: {
        tokenId: data.tokenId,
        status: { in: [ListingStatus.PENDING, ListingStatus.ACTIVE] },
      },
    });

    if (isExistingListing) {
      throw new BadRequestException('Token already listed or pending');
    }

    const factory = this.contracts.getContract('Marketplace');

    const id = uuidv7;

    const txData = await factory.listItem.populateTransaction(token.contractAddress, token.onchainId, data.price, '0', id);

    return this.dbService.listing.create({
      data: {
        id: id,
        tokenId: data.tokenId,
        price: data.price,
        sellerAddress: userAddress,
        paymentToken: '0',
        txData: txData as unknown as InputJsonValue,
        status: ListingStatus.PENDING,
      },
    });
  }
}
