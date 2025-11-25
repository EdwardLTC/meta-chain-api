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
exports.CollectionsController = void 0;
const common_1 = require("@nestjs/common");
const collections_service_1 = require("./collections.service");
const create_dto_1 = require("./dtos/create.dto");
const swagger_1 = require("@nestjs/swagger");
const sign_contract_dto_1 = require("./dtos/sign-contract.dto");
const auth_decorator_1 = require("../../auth/auth.decorator");
let CollectionsController = class CollectionsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async getCollections() {
        return this.svc.getCollections();
    }
    async getCollection(id) {
        return this.svc.getCollection(id);
    }
    async create(dto, userWallet, userId) {
        return this.svc.createCollection(dto, userWallet, userId);
    }
    async signContract(dto, privateKey) {
        return this.svc.testSignContract(dto, privateKey);
    }
};
exports.CollectionsController = CollectionsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollectionsController.prototype, "getCollections", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollectionsController.prototype, "getCollection", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorator_1.User)('walletAddress')),
    __param(2, (0, auth_decorator_1.User)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateCollectionDto, String, String]),
    __metadata("design:returntype", Promise)
], CollectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('sign-contract-dev-only/:privateKey'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('privateKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_contract_dto_1.SignContractDto, String]),
    __metadata("design:returntype", Promise)
], CollectionsController.prototype, "signContract", null);
exports.CollectionsController = CollectionsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('collections'),
    __metadata("design:paramtypes", [collections_service_1.CollectionsService])
], CollectionsController);
//# sourceMappingURL=collections.controller.js.map