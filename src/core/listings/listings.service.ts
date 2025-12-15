import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListingDto } from './dtos/create.dto';
import { TokensService } from '../tokens/tokens.service';
import { ContractsService } from '../../eth/contracts.service';
import { ListingStatus } from '../../../generated/prisma/enums.mjs';
import { uuidv7 } from '../../ultils/uuid';
import { InputJsonValue, PrismaClientKnownRequestError } from '@prisma/client/runtime/edge';
import { GetListingFilterDto } from './dtos/get-listing-filter.dto';
import { ethers } from 'ethers';

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

    const marketplace = this.contracts.getContract('Marketplace');

    const id = uuidv7();

    const txData = await marketplace.listItem.populateTransaction(
      token.contractAddress,
      token.onchainId,
      ethers.parseEther(data.price.toString()),
      '0x0000000000000000000000000000000000000000',
      id,
    );

    return this.dbService.listing.create({
      data: {
        id: id,
        tokenId: data.tokenId,
        price: data.price,
        sellerAddress: userAddress,
        paymentToken: '0x0000000000000000000000000000000000000000',
        txData: txData as unknown as InputJsonValue,
        status: ListingStatus.PENDING,
      },
    });
  }

  public async getListings(getListingFilterDto: GetListingFilterDto, userAddress: string) {
    return this.dbService.listing.findMany({
      where: {
        ...(getListingFilterDto.isMe
          ? { sellerAddress: userAddress }
          : {
              status: ListingStatus.ACTIVE,
            }),
      },
      include: {
        token: true,
      },
    });
  }

  public async getListing(id: string) {
    return this.dbService.listing.findUniqueOrThrow({ where: { id: id }, include: { token: true } }).catch(err => {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new NotFoundException('Collection not found');
      }

      throw err;
    });
  }

  public async buyListing(id: string, buyerAddress: string) {
    const listing = await this.getListing(id);

    if (listing.status !== ListingStatus.ACTIVE) {
      throw new BadRequestException('Listing is not active');
    }

    if (listing.sellerAddress.toLowerCase() === buyerAddress.toLowerCase()) {
      throw new BadRequestException('You cannot buy your own listing');
    }

    const marketplace = this.contracts.getContract('Marketplace');

    return marketplace.buyItem.populateTransaction(listing.onchainId, {
      value: ethers.parseEther(listing.price.toString()),
    });
  }

  public async cancelListing(id: string, userAddress: string) {
    const listing = await this.getListing(id);

    if (listing.sellerAddress.toLowerCase() !== userAddress.toLowerCase()) {
      throw new ForbiddenException('You do not own this listing');
    }

    if (listing.status !== ListingStatus.ACTIVE) {
      throw new BadRequestException('Listing is not active');
    }

    const marketplace = this.contracts.getContract('Marketplace');

    return marketplace.cancelListing.populateTransaction(listing.onchainId);
  }
}
