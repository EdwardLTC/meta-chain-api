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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const eth_service_1 = require("./eth.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ethers_1 = require("ethers");
const environment_service_1 = require("../environment/environment.service");
let ContractsService = class ContractsService {
    eth;
    environmentService;
    deployments = null;
    contractCache = {};
    constructor(eth, environmentService) {
        this.eth = eth;
        this.environmentService = environmentService;
        this.loadDeployments();
    }
    getAbi(name) {
        if (!this.deployments || !this.deployments[name]) {
            throw new Error(`Contract ${name} not found in deployments`);
        }
        return this.deployments[name].abi || null;
    }
    getProvider() {
        return this.eth.getProvider();
    }
    loadDeployments() {
        const file = path_1.default.join(process.cwd(), 'deployments', this.environmentService.isProduction ? 'sepolia.json' : 'localhost.json');
        if (!fs_1.default.existsSync(file)) {
            throw new Error('Deployments file not found: ' + file);
        }
        try {
            const raw = fs_1.default.readFileSync(file, 'utf-8');
            this.deployments = JSON.parse(raw).contracts || JSON.parse(raw);
        }
        catch (e) {
            throw new Error('Failed to parse deployments file: ' + e.message);
        }
    }
    getContract(name, protocall = 'HTTP') {
        if (this.contractCache[name]) {
            return this.contractCache[name];
        }
        if (!this.deployments || !this.deployments[name]) {
            throw new Error(`Contract ${name} not found in deployments`);
        }
        const info = this.deployments[name];
        if (!info.abi || !info.address) {
            throw new Error(`Contract ${name} is missing ABI or address`);
        }
        this.contractCache[name] = new ethers_1.Contract(info.address, info.abi, protocall === 'HTTP' ? this.eth.getProvider() : this.eth.getWebSocketProvider());
        return this.contractCache[name];
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [eth_service_1.EthService,
        environment_service_1.EnvironmentService])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map