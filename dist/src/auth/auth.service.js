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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const redis_service_1 = require("../redis/redis.service");
const node_crypto_1 = require("node:crypto");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../core/users/users.service");
let AuthService = class AuthService {
    userService;
    redis;
    jwtService;
    constructor(userService, redis, jwtService) {
        this.userService = userService;
        this.redis = redis;
        this.jwtService = jwtService;
    }
    async getNonce(address) {
        const key = `auth:nonce:${address.toLowerCase()}`;
        const existing = await this.redis.get(key);
        if (existing) {
            return { message: `Sign in nonce: ${existing}` };
        }
        const nonce = (0, node_crypto_1.randomBytes)(16).toString('hex');
        await this.redis.set(key, nonce, 300);
        return {
            message: `Sign in nonce: ${nonce}`,
        };
    }
    async verifySignature(address, signature) {
        const key = `auth:nonce:${address.toLowerCase()}`;
        const nonce = await this.redis.get(key);
        if (!nonce)
            throw new common_1.UnauthorizedException('No nonce found');
        const recoveredAddress = ethers_1.ethers.verifyMessage(`Sign in nonce: ${nonce}`, signature);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new common_1.UnauthorizedException('Invalid signature');
        }
        await this.redis.del(key);
        await this.userService.upsert(address, {
            username: address,
        });
        return this.jwtService.sign({
            sub: address,
            walletAddress: address.toLowerCase(),
        });
    }
    async signatureWithPrivateKey(privateKey) {
        const wallet = new ethers_1.ethers.Wallet(privateKey);
        const user = await this.userService.upsert(wallet.address, {
            username: wallet.address,
        });
        return this.jwtService.sign({
            sub: wallet.address,
            userId: user.id,
            walletAddress: wallet.address.toLowerCase(),
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        redis_service_1.RedisService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map