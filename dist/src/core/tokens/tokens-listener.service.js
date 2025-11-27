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
var TokensListenerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensListenerService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const contracts_service_1 = require("../../eth/contracts.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_mjs_1 = require("../../../generated/prisma/enums.mjs");
const tokens_abi_1 = require("./tokens.abi");
let TokensListenerService = TokensListenerService_1 = class TokensListenerService {
    contracts;
    prisma;
    logger = new common_1.Logger(TokensListenerService_1.name);
    factoryContract;
    collectionContracts = new Map();
    constructor(contracts, prisma) {
        this.contracts = contracts;
        this.prisma = prisma;
        this.factoryContract = this.contracts.getContractWs('Factory');
    }
    async onModuleInit() {
        const collections = await this.prisma.collection.findMany({
            where: { contractAddress: { not: null } },
        });
        for (const col of collections) {
            await this.addCollectionListener(col.contractAddress);
        }
        this.logger.log('TokensListenerService initialized');
    }
    onModuleDestroy() {
        try {
            for (const contract of this.collectionContracts.values()) {
                if (contract && contract.removeAllListeners) {
                    void contract.removeAllListeners('Minted');
                }
            }
            this.collectionContracts.clear();
            if (this.factoryContract && this.factoryContract.removeAllListeners) {
                void this.factoryContract.removeAllListeners('CollectionCreated');
            }
            const provider = this.contracts.getProvider();
            if (provider && provider.removeAllListeners) {
                void provider.removeAllListeners();
            }
        }
        catch (e) {
            this.logger.error('Error during listener cleanup: ' + (e?.message ?? String(e)));
        }
    }
    async addCollectionListener(collectionAddress) {
        if (this.collectionContracts.has(collectionAddress)) {
            this.logger.debug(`Collection listener already exists for ${collectionAddress}`);
            return;
        }
        const contract = new ethers_1.Contract(collectionAddress, tokens_abi_1.ABI, this.contracts.getProvider());
        this.collectionContracts.set(collectionAddress, contract);
        await contract.on('Minted', (to, tokenId, uri, transactionCode, event) => {
            this.logger.log(`Minted: to=${to}, tokenId=${tokenId}, uri=${uri}, txCode=${transactionCode}`);
            void (async () => {
                try {
                    await this.prisma.token.update({
                        where: { id: transactionCode, status: enums_mjs_1.TokenStatus.PENDING },
                        data: {
                            status: enums_mjs_1.TokenStatus.MINTED,
                            tokenId: tokenId.toString(),
                            contractAddress: event.log.address,
                            mintTxHash: event.log.transactionHash,
                        },
                    });
                }
                catch (err) {
                    this.logger.error(`Prisma update failed for token ${transactionCode}: ${err?.message ?? String(err)}`);
                }
            })();
        });
        this.logger.log(`Listener added for collection ${collectionAddress}`);
    }
};
exports.TokensListenerService = TokensListenerService;
exports.TokensListenerService = TokensListenerService = TokensListenerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService,
        prisma_service_1.PrismaService])
], TokensListenerService);
//# sourceMappingURL=tokens-listener.service.js.map