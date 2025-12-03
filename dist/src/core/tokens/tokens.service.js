"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const collections_service_1 = require("../collections/collections.service");
const ethers_1 = require("ethers");
const tokens_abi_1 = require("./tokens.abi");
const prisma_service_1 = require("../../prisma/prisma.service");
const nft_storage_service_1 = require("../../nft-storage/nft-storage.service");
const eth_service_1 = require("../../eth/eth.service");
const enums_mjs_1 = require("../../../generated/prisma/enums.mjs");
const edge_1 = require("@prisma/client/runtime/edge");
const uuid_1 = require("../../ultils/uuid");
let TokensService = class TokensService {
    dbService;
    collectionService;
    nftStorageService;
    ethService;
    constructor(dbService, collectionService, nftStorageService, ethService) {
        this.dbService = dbService;
        this.collectionService = collectionService;
        this.nftStorageService = nftStorageService;
        this.ethService = ethService;
    }
    async mintToken(data, creatorAddress, userId) {
        const collection = await this.collectionService.getCollection(data.collectionId);
        if (collection.userId !== userId) {
            throw new common_1.UnauthorizedException('You do not have permission to mint tokens in this collection');
        }
        if (collection.status !== enums_mjs_1.CollectionStatus.CREATED) {
            throw new common_1.BadRequestException('Contract for this collection is not yet created on blockchain');
        }
        if (!collection.contractAddress) {
            throw new common_1.InternalServerErrorException(`Collection ${collection.id} has no contract address`);
        }
        const metadataUrl = await this.nftStorageService.uploadMetadata({
            name: data.name,
            description: data.description,
            image: data.image,
            creatorAddress: creatorAddress,
            collectionAddress: collection.contractAddress,
        }, `${collection.contractAddress}-${data.name}`);
        const id = (0, uuid_1.uuidv7)();
        const contract = new ethers_1.Contract(collection.contractAddress, tokens_abi_1.ABI, this.ethService.getProvider());
        const txData = await contract.mint.populateTransaction(creatorAddress, metadataUrl, id);
        return this.dbService.token.create({
            data: {
                id: id,
                collectionId: data.collectionId,
                ownerAddress: creatorAddress,
                contractAddress: collection.contractAddress,
                tokenUri: metadataUrl,
                name: data.name,
                description: data.description,
                image: data.image,
                status: enums_mjs_1.TokenStatus.PENDING,
                txData: txData,
            },
        });
    }
    async getTokens(getTokensFilterDto) {
        return this.dbService.token.findMany({ where: { collectionId: getTokensFilterDto.collectionId, status: enums_mjs_1.TokenStatus.MINTED } });
    }
    async getToken(tokenId) {
        return this.dbService.token.findUniqueOrThrow({ where: { id: tokenId } }).catch(err => {
            if (err instanceof edge_1.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new common_1.NotFoundException('Collection not found');
            }
            throw err;
        });
    }
};
exports.TokensService = TokensService;
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => collections_service_1.CollectionsService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        collections_service_1.CollectionsService,
        nft_storage_service_1.NftStorageService,
        eth_service_1.EthService])
], TokensService);
//# sourceMappingURL=tokens.service.js.map