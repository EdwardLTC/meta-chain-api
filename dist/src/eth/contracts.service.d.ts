import { EthService } from './eth.service';
import { Contract, InterfaceAbi } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';
export declare class ContractsService {
    private eth;
    private environmentService;
    private deployments;
    private contractCache;
    constructor(eth: EthService, environmentService: EnvironmentService);
    getAbi(name: string): InterfaceAbi | null;
    getProvider(): import("ethers").JsonRpcProvider;
    loadDeployments(): void;
    getContract(name: string, protocall?: 'HTTP' | 'WS'): Contract;
}
