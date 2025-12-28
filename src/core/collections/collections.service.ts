import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dtos/create.dto';
import { ContractsService } from 'src/eth/contracts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputJsonValue, PrismaClientKnownRequestError } from '@prisma/client/runtime/edge';
import { CollectionStatus, TokenStatus } from '../../../generated/prisma/enums.mjs';
import { uuidv7 } from '../../ultils/uuid';
import { GetCollectionsQuery } from './dtos/get-collections.dto';
import { Contract, ethers, EventLog } from 'ethers';
import { ABI } from '../tokens/tokens.abi';
import { MARKETPLACE_ADDRESS } from '../../ultils/constrain';
import { ERC165_ABI, ERC2981_ABI, ERC721_ABI, OWNABLE_ABI } from './collections.abi';
import { TokenCreateManyCollectionInput } from '../../../generated/prisma/models/Token.mjs';
import { TokensListener } from '../tokens/tokens.listener';

@Injectable()
export class CollectionsService {
  constructor(
    private contracts: ContractsService,
    private prisma: PrismaService,
    @Inject(forwardRef(() => TokensListener))
    private tokenListenerService: TokensListener,
  ) {}

  public async createCollection(createBody: CreateCollectionDto, creatorAddress: string, userId: string) {
    const factory = this.contracts.getContract('Factory');

    const id = uuidv7();

    const txData = await factory.createCollection.populateTransaction(
      createBody.name,
      createBody.symbol,
      id,
      creatorAddress,
      createBody.royaltyFeeBps,
    );

    return this.prisma.collection.create({
      data: {
        id: id,
        userId: userId,
        creatorAddress: creatorAddress,
        name: createBody.name,
        symbol: createBody.symbol,
        description: createBody.description,
        image: createBody.image,
        royaltyFeeBps: createBody.royaltyFeeBps,
        status: CollectionStatus.PENDING,
        txData: txData as unknown as InputJsonValue,
      },
    });
  }

  public async getCollections(getCollectionsQuery: GetCollectionsQuery, userId: string) {
    return this.prisma.collection.findMany({
      where: {
        ...(getCollectionsQuery.isMe ? { userId: userId } : { userId: { not: userId }, status: CollectionStatus.CREATED }),
      },
    });
  }

  public async getCollection(id: string) {
    return this.prisma.collection.findUniqueOrThrow({ where: { id } }).catch(err => {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new NotFoundException('Collection not found');
      }

      throw err;
    });
  }

  public async updateRoyaltyInfo(collectionId: string, royaltyFeeBps: number) {
    const collection = await this.getCollection(collectionId);

    if (collection.status !== CollectionStatus.CREATED) {
      throw new NotFoundException('Collection not found or not created yet');
    }

    const contract = new Contract(collection.contractAddress!, ABI, this.contracts.getProvider());

    return contract.setRoyalty.populateTransaction(collection.creatorAddress, royaltyFeeBps, collection.id);
  }

  public async isCollectionApprovedForMarketplace(id: string, ownerAddress: string): Promise<boolean> {
    const collection = await this.getCollection(id);

    if (collection.status !== CollectionStatus.CREATED) {
      throw new NotFoundException('Collection not found or not created yet');
    }

    const contract = new Contract(collection.contractAddress!, ABI, this.contracts.getProvider());

    return contract.isApprovedForAll(ownerAddress, MARKETPLACE_ADDRESS);
  }

  public async approveCollectionForMarketplace(id: string) {
    const collection = await this.getCollection(id);

    if (collection.status !== CollectionStatus.CREATED) {
      throw new NotFoundException('Collection not found or not created yet');
    }

    const contract = new Contract(collection.contractAddress!, ABI, this.contracts.getProvider());

    return contract.setApprovalForAll.populateTransaction(MARKETPLACE_ADDRESS, true);
  }

  public async importCollections(contractAddress: string, userWallet: string, userId: string) {
    if (!ethers.isAddress(contractAddress)) {
      throw new BadRequestException('Invalid contract address');
    }

    const address = ethers.getAddress(contractAddress);

    const isExisting = await this.prisma.collection.findUnique({
      where: {
        contractAddress: address,
      },
    });

    if (isExisting) {
      throw new BadRequestException('Collection already imported');
    }

    const provider = this.contracts.getProvider();

    const erc165 = new ethers.Contract(address, ERC165_ABI, provider);

    const [isERC721, hasERC2981] = await Promise.all([
      this.supportsInterfaceSafe(erc165, '0x80ac58cd'),
      this.supportsInterfaceSafe(erc165, '0x2a55205a'),
    ]);

    if (!isERC721) {
      throw new BadRequestException('Contract is not a valid ERC-721 with metadata support');
    }

    let royaltyFeeBps = 0;
    if (hasERC2981) {
      const erc2981 = new ethers.Contract(address, ERC2981_ABI, provider);
      const [, royaltyAmount] = await erc2981.royaltyInfo(0, 10_000);
      royaltyFeeBps = Number(royaltyAmount);
    }

    let creatorAddress: string;
    try {
      creatorAddress = await new ethers.Contract(address, OWNABLE_ABI, provider).owner();
    } catch {
      throw new BadRequestException('Failed to fetch contract owner');
    }

    if (creatorAddress.toLowerCase() !== userWallet.toLowerCase()) {
      throw new BadRequestException('You are not the owner of this contract');
    }

    const erc721 = new ethers.Contract(address, ERC721_ABI, provider);

    const [name, symbol] = await Promise.all([erc721.name(), erc721.symbol()]);

    const filter = erc721.filters.Transfer(ethers.ZeroAddress, null);

    const current = await provider.getBlockNumber();
    const fromBlock = current - 5_000_000;

    const events = await erc721.queryFilter(filter, fromBlock, 'latest');

    const tokenIds = events.map((e: EventLog) => Number(e.args.tokenId));

    const aliveTokenIds = new Set(tokenIds);

    const token: TokenCreateManyCollectionInput[] = [];

    for (const tokenId of Array.from(aliveTokenIds)) {
      const tokenUri: string = await erc721.tokenURI(tokenId);
      const metadataUrl = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      const owner = await erc721.ownerOf(tokenId);
      const meta = await fetch(metadataUrl).then(r => r.json());

      token.push({
        id: uuidv7(),
        ownerAddress: owner,
        onchainId: Number(tokenId),
        tokenUri: tokenUri,
        name: meta.name ?? '',
        description: meta.description ?? '',
        image: (meta.image ?? '').replace('ipfs://', 'https://ipfs.io/ipfs/'),
        status: TokenStatus.MINTED,
        txData: {
          importedAt: new Date().toISOString(),
        },
      });
    }

    await this.tokenListenerService.addCollectionListener(address);

    return this.prisma.collection.create({
      data: {
        id: uuidv7(),
        status: CollectionStatus.CREATED,
        creatorAddress: creatorAddress,
        name: name,
        symbol: symbol,
        contractAddress: address,
        description: '',
        image: '',
        royaltyFeeBps: royaltyFeeBps,
        userId: userId,
        txData: {
          importedAt: new Date().toISOString(),
          tokenCount: token.length,
        },
        tokens: {
          createMany: {
            data: token,
          },
        },
      },
    });
  }

  private async supportsInterfaceSafe(contract: Contract, interfaceId: string): Promise<boolean> {
    try {
      return await contract.supportsInterface(interfaceId);
    } catch {
      return false;
    }
  }
}
