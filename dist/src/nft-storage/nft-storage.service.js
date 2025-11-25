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
exports.NftStorageService = void 0;
const common_1 = require("@nestjs/common");
const environment_service_1 = require("../environment/environment.service");
const pinata_1 = require("pinata");
let NftStorageService = class NftStorageService {
    environmentService;
    client;
    constructor(environmentService) {
        this.environmentService = environmentService;
        this.client = new pinata_1.PinataSDK({
            pinataJwt: this.environmentService.pinata.apiKey,
            pinataGateway: this.environmentService.pinata.gateway,
        });
    }
    async uploadMetadata(data, name) {
        const response = await this.client.upload.public.json(data).name(name);
        return response.cid;
    }
};
exports.NftStorageService = NftStorageService;
exports.NftStorageService = NftStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [environment_service_1.EnvironmentService])
], NftStorageService);
//# sourceMappingURL=nft-storage.service.js.map