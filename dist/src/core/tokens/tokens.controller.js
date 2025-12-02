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
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("./tokens.service");
const mint_dto_1 = require("./dtos/mint.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../../auth/auth.decorator");
const get_tokens_filter_dto_1 = require("./dtos/get-tokens-filter.dto");
let TokensController = class TokensController {
    tokensService;
    constructor(tokensService) {
        this.tokensService = tokensService;
    }
    async getTokens(filter) {
        return this.tokensService.getTokens(filter);
    }
    async getToken(id) {
        return this.tokensService.getToken(id);
    }
    async mintToken(data, walletAddress, userId) {
        return this.tokensService.mintToken(data, walletAddress, userId);
    }
};
exports.TokensController = TokensController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tokens_filter_dto_1.GetTokensFilterDto]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "getTokens", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "getToken", null);
__decorate([
    (0, common_1.Post)('mint'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.User)('walletAddress')),
    __param(2, (0, auth_decorator_1.User)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mint_dto_1.MintTokenDto, String, String]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "mintToken", null);
exports.TokensController = TokensController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
//# sourceMappingURL=tokens.controller.js.map