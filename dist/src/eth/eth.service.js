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
exports.EthService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const environment_service_1 = require("../environment/environment.service");
let EthService = class EthService {
    environmentService;
    provider;
    webSocketProvider;
    constructor(environmentService) {
        this.environmentService = environmentService;
        this.provider = new ethers_1.JsonRpcProvider(this.environmentService.ProviderNodeUrl);
        this.webSocketProvider = new ethers_1.JsonRpcProvider(this.environmentService.ProviderWsNodeUrl);
    }
    getProvider() {
        return this.provider;
    }
    getWebSocketProvider() {
        return this.webSocketProvider;
    }
    async getSigner(indexOrPrivateKey) {
        if (typeof indexOrPrivateKey === 'number') {
            return await this.provider.getSigner(indexOrPrivateKey);
        }
        if (typeof indexOrPrivateKey === 'string') {
            const wallet = new ethers_1.Wallet(indexOrPrivateKey, this.provider);
            return wallet;
        }
        return await this.provider.getSigner(0);
    }
};
exports.EthService = EthService;
exports.EthService = EthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [environment_service_1.EnvironmentService])
], EthService);
//# sourceMappingURL=eth.service.js.map