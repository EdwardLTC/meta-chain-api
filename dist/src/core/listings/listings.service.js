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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const tokens_service_1 = require("../tokens/tokens.service");
const contracts_service_1 = require("../../eth/contracts.service");
const enums_mjs_1 = require("../../../generated/prisma/enums.mjs");
const uuid_1 = require("../../ultils/uuid");
const edge_1 = require("@prisma/client/runtime/edge");
let ListingsService = class ListingsService {
    dbService;
    tokenService;
    contracts;
    constructor(dbService, tokenService, contracts) {
        this.dbService = dbService;
        this.tokenService = tokenService;
        this.contracts = contracts;
    }
    async createListing(data, userAddress) {
        const token = await this.tokenService.getToken(data.tokenId);
        if (token.ownerAddress !== userAddress) {
            throw new common_1.ForbiddenException('You do not own this token');
        }
        const isExistingListing = await this.dbService.listing.findFirst({
            where: {
                tokenId: data.tokenId,
                status: { in: [enums_mjs_1.ListingStatus.PENDING, enums_mjs_1.ListingStatus.ACTIVE] },
            },
        });
        if (isExistingListing) {
            throw new common_1.BadRequestException('Token already listed or pending');
        }
        const factory = this.contracts.getContract('Marketplace');
        const id = (0, uuid_1.uuidv7)();
        const txData = await factory.listItem.populateTransaction(token.contractAddress, token.onchainId, data.price, '0', id);
        return this.dbService.listing.create({
            data: {
                id: id,
                tokenId: data.tokenId,
                price: data.price,
                sellerAddress: userAddress,
                paymentToken: '0',
                txData: txData,
                status: enums_mjs_1.ListingStatus.PENDING,
            },
        });
    }
    async getListings(getListingFilterDto, userAddress) {
        return this.dbService.listing.findMany({
            where: {
                ...(getListingFilterDto.isMe
                    ? { sellerAddress: userAddress }
                    : {
                        status: {
                            not: enums_mjs_1.ListingStatus.PENDING,
                        },
                    }),
            },
        });
    }
    async getListing(id) {
        return this.dbService.listing.findUniqueOrThrow({ where: { id: id } }).catch(err => {
            if (err instanceof edge_1.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new common_1.NotFoundException('Collection not found');
            }
            throw err;
        });
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tokens_service_1.TokensService,
        contracts_service_1.ContractsService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map