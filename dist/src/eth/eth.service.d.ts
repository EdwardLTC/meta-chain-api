import { JsonRpcProvider, JsonRpcSigner } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';
export declare class EthService {
    private readonly environmentService;
    private readonly provider;
    constructor(environmentService: EnvironmentService);
    getProvider(): JsonRpcProvider;
    getSigner(indexOrPrivateKey?: number | string): Promise<JsonRpcSigner>;
}
