import { EthService } from '../eth/eth.service';
export declare class AppService {
    private eth;
    constructor(eth: EthService);
    testSignContract(txData: {
        to: string;
        data: string;
    }, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
