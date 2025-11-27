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
var CollectionsListenerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsListenerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const contracts_service_1 = require("../../eth/contracts.service");
const enums_mjs_1 = require("../../../generated/prisma/enums.mjs");
const tokens_listener_service_1 = require("../tokens/tokens-listener.service");
let CollectionsListenerService = CollectionsListenerService_1 = class CollectionsListenerService {
    contracts;
    prisma;
    tokenListenerService;
    logger = new common_1.Logger(CollectionsListenerService_1.name);
    contract;
    constructor(contracts, prisma, tokenListenerService) {
        this.contracts = contracts;
        this.prisma = prisma;
        this.tokenListenerService = tokenListenerService;
        this.contract = this.contracts.getContractWs('Factory');
    }
    async onModuleInit() {
        await this.contract.on('CollectionCreated', (creator, collection, transactionCode, event) => {
            this.logger.log(`CollectionCreated: creator=${creator}, collection=${collection}, txCode=${transactionCode}`);
            void (async () => {
                await this.prisma.collection
                    .update({
                    where: { id: transactionCode, status: enums_mjs_1.CollectionStatus.PENDING },
                    data: {
                        contractAddress: collection,
                        txHash: event.log.transactionHash,
                        status: enums_mjs_1.CollectionStatus.CREATED,
                    },
                })
                    .catch(err => {
                    this.logger.error(`Prisma update failed for collection ${transactionCode}: ${err?.message ?? String(err)}`);
                });
                await this.tokenListenerService.addCollectionListener(collection);
            })();
        });
        this.logger.log('CollectionCreated listener initialized');
    }
    onModuleDestroy() {
        try {
            if (this.contract && this.contract.removeAllListeners) {
                void this.contract.removeAllListeners('CollectionCreated');
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
};
exports.CollectionsListenerService = CollectionsListenerService;
exports.CollectionsListenerService = CollectionsListenerService = CollectionsListenerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => tokens_listener_service_1.TokensListenerService))),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService,
        prisma_service_1.PrismaService,
        tokens_listener_service_1.TokensListenerService])
], CollectionsListenerService);
//# sourceMappingURL=collections-listener.service.js.map