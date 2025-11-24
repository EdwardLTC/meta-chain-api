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
exports.EnvironmentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EnvironmentService = class EnvironmentService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    get environment() {
        return this.configService.get('NODE_ENV');
    }
    get port() {
        return this.configService.get('PORT');
    }
    get jwtSecret() {
        return this.configService.get('JWT_SECRET');
    }
    get dbConnectionString() {
        return this.configService.get('DATABASE_URL');
    }
    get redisConnection() {
        return {
            host: this.configService.get('REDIS_HOST'),
            port: this.configService.get('REDIS_PORT'),
        };
    }
    get ProviderNodeUrl() {
        return this.configService.get('PROVIDER_NODE_URL');
    }
    get isProduction() {
        return this.environment === 'production';
    }
};
exports.EnvironmentService = EnvironmentService;
exports.EnvironmentService = EnvironmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EnvironmentService);
//# sourceMappingURL=environment.service.js.map