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
var ListingsListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsListener = void 0;
const common_1 = require("@nestjs/common");
const contracts_service_1 = require("../../eth/contracts.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_mjs_1 = require("../../../generated/prisma/enums.mjs");
let ListingsListener = ListingsListener_1 = class ListingsListener {
    contracts;
    prisma;
    logger = new common_1.Logger(ListingsListener_1.name);
    marketplace;
    constructor(contracts, prisma) {
        this.contracts = contracts;
        this.prisma = prisma;
        this.marketplace = this.contracts.getContractWs('Marketplace');
    }
    async onModuleInit() {
        await this.marketplace.on('Listed', (listingId, seller, nft, tokenId, price, paymentToken, transactionCode, event) => {
            this.logger.log(`Listed: ${transactionCode} - Listing ID: ${listingId} - Seller: ${seller} - NFT: ${nft} - Token ID: ${tokenId} - Price: ${price} - Payment Token: ${paymentToken} - TxHash: ${event.log.transactionHash}`);
            void (async () => {
                await this.prisma.listing
                    .update({
                    where: { id: transactionCode, status: enums_mjs_1.ListingStatus.PENDING },
                    data: {
                        onchainId: listingId,
                        txHash: event.log.transactionHash,
                        status: enums_mjs_1.ListingStatus.ACTIVE,
                    },
                })
                    .catch(err => {
                    this.logger.error(`Prisma update failed for Listed ${transactionCode}: ${err?.message ?? String(err)}`);
                });
            })();
        });
        await this.marketplace.on('Cancelled', (listingId, seller) => {
            this.logger.log(`Cancelled: Listing ID: ${listingId} - Seller: ${seller}`);
            void (async () => {
                await this.prisma.listing
                    .update({
                    where: { onchainId: listingId, status: enums_mjs_1.ListingStatus.ACTIVE },
                    data: {
                        status: enums_mjs_1.ListingStatus.CANCELLED,
                    },
                })
                    .catch(err => {
                    this.logger.error(`Prisma update failed for Cancelled Listing ID ${listingId}: ${err?.message ?? String(err)}`);
                });
            })();
        });
        await this.marketplace.on('Bought', (listingId, buyer, seller, price, paymentToken, marketFeeBps, marketFeeAmount, feeRecipient, royaltyReceiver, royaltyAmount, sellerProceeds) => {
            this.logger.log(`Bought: Listing ID: ${listingId} - Buyer: ${buyer} - Seller: ${seller} - Price: ${price} - Payment Token: ${paymentToken} - Market Fee Bps: ${marketFeeBps} - Market Fee Amount: ${marketFeeAmount} - Fee Recipient: ${feeRecipient} - Royalty Receiver: ${royaltyReceiver} - Royalty Amount: ${royaltyAmount} - Seller Proceeds: ${sellerProceeds}`);
            void (async () => {
                await this.prisma.listing
                    .update({
                    where: { onchainId: listingId, status: enums_mjs_1.ListingStatus.ACTIVE },
                    data: {
                        status: enums_mjs_1.ListingStatus.SOLD,
                        buyerAddress: buyer,
                        soldAt: new Date(),
                        marketFeeBps: marketFeeBps,
                        marketFeeAmount: marketFeeAmount,
                        feeRecipient: feeRecipient,
                        royaltyReceiver: royaltyReceiver,
                        royaltyAmount: royaltyAmount,
                        sellerProceeds: sellerProceeds,
                    },
                })
                    .catch(err => {
                    this.logger.error(`Prisma update failed for Bought Listing ID ${listingId}: ${err?.message ?? String(err)}`);
                });
            })();
        });
        this.logger.log('Listing listener initialized');
    }
    onModuleDestroy() {
        try {
            if (this.marketplace && this.marketplace.removeAllListeners) {
                void this.marketplace.removeAllListeners();
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
exports.ListingsListener = ListingsListener;
exports.ListingsListener = ListingsListener = ListingsListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService,
        prisma_service_1.PrismaService])
], ListingsListener);
//# sourceMappingURL=listings.listener.js.map