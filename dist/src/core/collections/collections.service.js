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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const contracts_service_1 = require("../../eth/contracts.service");
const eth_service_1 = require("../../eth/eth.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const edge_1 = require("@prisma/client/runtime/edge");
const enums_mjs_1 = require("../../../generated/prisma/enums.mjs");
let CollectionsService = class CollectionsService {
    contracts;
    eth;
    prisma;
    constructor(contracts, eth, prisma) {
        this.contracts = contracts;
        this.eth = eth;
        this.prisma = prisma;
    }
    async createCollection(createBody, creatorAddress, userId) {
        const create = await this.prisma.collection.create({
            data: {
                userId: userId,
                creatorAddress: creatorAddress,
                name: createBody.name,
                symbol: createBody.symbol,
                description: createBody.description,
                image: createBody.image,
                royaltyFeeBps: createBody.royaltyFeeBps,
                status: enums_mjs_1.CollectionStatus.NEW,
            },
        });
        const factory = this.contracts.getContract('Factory');
        const txData = await factory.createCollection.populateTransaction(createBody.name, createBody.symbol, create.id, creatorAddress, createBody.royaltyFeeBps);
        return this.prisma.collection.update({
            where: { id: create.id },
            data: {
                status: enums_mjs_1.CollectionStatus.PENDING,
                txData: txData,
            },
        });
    }
    async getCollections() {
        return this.prisma.collection.findMany({ where: { status: enums_mjs_1.CollectionStatus.CREATED } });
    }
    async getCollection(id) {
        return this.prisma.collection.findUniqueOrThrow({ where: { id } }).catch(err => {
            if (err instanceof edge_1.PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new common_1.NotFoundException('Collection not found');
            }
            throw err;
        });
    }
    async testSignContract(txData, privateKey) {
        const wallet = await this.eth.getSigner(privateKey);
        return wallet.sendTransaction({
            to: txData.to,
            data: txData.data,
            gasLimit: 16777215,
            value: 0,
        });
    }
};
exports.CollectionsService = CollectionsService;
exports.CollectionsService = CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService,
        eth_service_1.EthService,
        prisma_service_1.PrismaService])
], CollectionsService);
//# sourceMappingURL=collections.service.js.map