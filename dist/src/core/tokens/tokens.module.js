"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("./tokens.service");
const tokens_controller_1 = require("./tokens.controller");
const tokens_listener_1 = require("./tokens.listener");
const collections_module_1 = require("../collections/collections.module");
const nft_storage_module_1 = require("../../nft-storage/nft-storage.module");
const eth_module_1 = require("../../eth/eth.module");
let TokensModule = class TokensModule {
};
exports.TokensModule = TokensModule;
exports.TokensModule = TokensModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => collections_module_1.CollectionsModule), nft_storage_module_1.NftStorageModule, eth_module_1.EthModule],
        controllers: [tokens_controller_1.TokensController],
        providers: [tokens_service_1.TokensService, tokens_listener_1.TokensListener],
        exports: [tokens_service_1.TokensService, tokens_listener_1.TokensListener],
    })
], TokensModule);
//# sourceMappingURL=tokens.module.js.map