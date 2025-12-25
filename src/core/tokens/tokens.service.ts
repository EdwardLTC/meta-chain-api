import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MintTokenDto } from './dtos/mint.dto';
import { CollectionsService } from '../collections/collections.service';
import { Contract } from 'ethers';
import { ABI } from './tokens.abi';
import { PrismaService } from '../../prisma/prisma.service';
import { NftStorageService } from '../../nft-storage/nft-storage.service';
import { EthService } from '../../eth/eth.service';
import { CollectionStatus, ListingStatus, TokenStatus } from '../../../generated/prisma/enums.mjs';
import { GetTokensFilterDto } from './dtos/get-tokens-filter.dto';
import { InputJsonValue, PrismaClientKnownRequestError } from '@prisma/client/runtime/edge';
import { uuidv7 } from '../../ultils/uuid';

@Injectable()
export class TokensService {
  constructor(
    private dbService: PrismaService,
    @Inject(forwardRef(() => CollectionsService))
    private collectionService: CollectionsService,
    private nftStorageService: NftStorageService,
    private ethService: EthService,
  ) {}

  public async mintToken(data: MintTokenDto, creatorAddress: string, userId: string) {
    const collection = await this.collectionService.getCollection(data.collectionId);

    if (collection.userId !== userId) {
      throw new UnauthorizedException('You do not have permission to mint tokens in this collection');
    }

    if (collection.status !== CollectionStatus.CREATED) {
      throw new BadRequestException('Contract for this collection is not yet created on blockchain');
    }

    if (!collection.contractAddress) {
      throw new InternalServerErrorException(`Collection ${collection.id} has no contract address`);
    }

    const metadata = await this.nftStorageService.uploadMetadata({
      name: data.name,
      description: data.description,
      image: data.image,
    });

    const id = uuidv7();

    const contract = new Contract(collection.contractAddress, ABI, this.ethService.getProvider());

    const txData = await contract.mint.populateTransaction(creatorAddress, metadata.ipfsUrl, id);

    return this.dbService.token.create({
      data: {
        id: id,
        collectionId: data.collectionId,
        ownerAddress: creatorAddress,
        contractAddress: collection.contractAddress,
        tokenUri: metadata.ipfsUrl,
        name: data.name,
        description: data.description,
        image: data.image,
        status: TokenStatus.PENDING,
        txData: txData as unknown as InputJsonValue,
      },
    });
  }

  public async getTokens(getTokensFilterDto: GetTokensFilterDto, userAddress: string, userId: string) {
    const tokens = await this.dbService.token.findMany({
      where: {
        collectionId: getTokensFilterDto.collectionId,
        ...(getTokensFilterDto.isMe ? { ownerAddress: userAddress } : { status: TokenStatus.MINTED }),
      },
      include: {
        tokenLikes: {
          where: { userId: userId },
        },
      },
    });

    return tokens.map(token => ({
      ...token,
      isLiked: token.tokenLikes.length > 0,
      tokenLikes: undefined,
    }));
  }

  public async getToken(tokenId: string, userId: string) {
    const token = await this.dbService.token
      .findUniqueOrThrow({
        where: { id: tokenId },
        include: {
          tokenLikes: {
            where: { userId: userId },
          },
        },
      })
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
          throw new NotFoundException('Collection not found');
        }

        throw err;
      });

    const listing = await this.isTokenListed(tokenId);

    return {
      ...token,
      listing,
      isLiked: token.tokenLikes.length > 0,
      tokenLikes: undefined,
    };
  }

  public async isTokenListed(tokenId: string) {
    return this.dbService.listing.findFirst({
      where: {
        tokenId: tokenId,
        status: ListingStatus.ACTIVE,
      },
    });
  }
}
