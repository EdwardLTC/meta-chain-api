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
import { CollectionStatus, TokenStatus } from '../../../generated/prisma/enums.mjs';
import { SignTokenDto } from './dtos/sign-token.dto';
import { GetTokensFilterDto } from './dtos/get-tokens-filter.dto';
import { InputJsonValue, PrismaClientKnownRequestError } from '@prisma/client/runtime/edge';

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

    const metadataUrl = await this.nftStorageService.uploadMetadata(
      {
        name: data.name,
        description: data.description,
        image: data.image,
        creatorAddress: creatorAddress,
        collectionAddress: collection.contractAddress,
      },
      `${collection.contractAddress}-${data.name}`,
    );

    const createdToken = await this.dbService.token.create({
      data: {
        collectionId: data.collectionId,
        ownerAddress: creatorAddress,
        tokenUri: metadataUrl,
        name: data.name,
        description: data.description,
        image: data.image,
        status: TokenStatus.NEW,
      },
    });

    const contract = new Contract(collection.contractAddress, ABI, this.ethService.getProvider());

    const txData = await contract.mint.populateTransaction(creatorAddress, metadataUrl, createdToken.id);

    return this.dbService.token.update({
      where: { id: createdToken.id },
      data: {
        status: TokenStatus.PENDING,
        txData: txData as unknown as InputJsonValue,
      },
    });
  }

  public async getTokens(getTokensFilterDto: GetTokensFilterDto) {
    return this.dbService.token.findMany({ where: { collectionId: getTokensFilterDto.collectionId, status: TokenStatus.MINTED } });
  }

  public async getToken(tokenId: string) {
    return this.dbService.token.findUniqueOrThrow({ where: { id: tokenId } }).catch(err => {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new NotFoundException('Collection not found');
      }

      throw err;
    });
  }

  public async signTokenTransfer(txData: SignTokenDto, privateKey: string) {
    const wallet = await this.ethService.getSigner(privateKey);

    return wallet.sendTransaction({
      to: txData.to,
      data: txData.data,
      gasLimit: 16777215,
      value: 0,
    });
  }
}
