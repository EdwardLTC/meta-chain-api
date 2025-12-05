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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const sign_contract_dto_1 = require("./dtos/sign-contract.dto");
const auth_service_1 = require("../auth/auth.service");
const public_decorator_1 = require("../auth/public.decorator");
let AppController = class AppController {
    appService;
    authService;
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    async signContract(dto, privateKey) {
        return this.appService.testSignContract(dto, privateKey);
    }
    signatureWithPrivateKey(address) {
        return this.authService.signatureWithPrivateKey(address);
    }
    async approveAllNftForMarketplace(contractAddress, privateKey) {
        return this.appService.approveAllNftForMarketplace(contractAddress, privateKey);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('dev-only/sign-contract/:privateKey'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('privateKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_contract_dto_1.SignContractDto, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signContract", null);
__decorate([
    (0, common_1.Post)('dev-only/generate-jwt-private-key/:privateKey'),
    __param(0, (0, common_1.Query)('privateKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signatureWithPrivateKey", null);
__decorate([
    (0, common_1.Post)('dev-only/approve-all-nft/:contractAddress/:privateKey'),
    __param(0, (0, common_1.Param)('contractAddress')),
    __param(1, (0, common_1.Param)('privateKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "approveAllNftForMarketplace", null);
exports.AppController = AppController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map