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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const eth_service_1 = require("../eth/eth.service");
const ethers_1 = require("ethers");
let AppService = class AppService {
    eth;
    constructor(eth) {
        this.eth = eth;
    }
    async testSignContract(txData, privateKey) {
        const wallet = await this.eth.getSigner(privateKey);
        const tx = await wallet.sendTransaction({
            to: txData.to,
            data: txData.data,
            gasLimit: 16777215,
            value: txData.value ? BigInt(txData.value) : 0,
        });
        return tx.wait();
    }
    async approveAllNftForMarketplace(contractAddress, privateKey) {
        const wallet = await this.eth.getSigner(privateKey);
        const erc721Abi = [
            'function isApprovedForAll(address owner, address operator) view returns (bool)',
            'function setApprovalForAll(address operator, bool _approved)',
        ];
        const nftContract = new ethers_1.Contract(contractAddress, erc721Abi, wallet);
        const isApproved = await nftContract.isApprovedForAll(wallet.address, '0x3836559F707687901c5955deC4840Be5cC011597');
        console.log('Approved already?', isApproved);
        if (!isApproved) {
            console.log('Approving all NFT for marketplace...');
            const tx = await nftContract.setApprovalForAll('0x3836559F707687901c5955deC4840Be5cC011597', true);
            console.log('Transaction hash:', tx.hash);
            return tx.wait();
        }
        else {
            return {
                message: 'Already approved',
            };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [eth_service_1.EthService])
], AppService);
//# sourceMappingURL=app.service.js.map