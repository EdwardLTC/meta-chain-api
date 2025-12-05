import { EthService } from '../eth/eth.service';
export declare class AppService {
    private eth;
    constructor(eth: EthService);
    testSignContract(txData: {
        to: string;
        data: string;
        value: string;
    }, privateKey: string): Promise<import("ethers").TransactionReceipt | null>;
    approveAllNftForMarketplace(contractAddress: string, privateKey: string): Promise<any>;
}
