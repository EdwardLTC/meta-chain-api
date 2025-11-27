import { JsonRpcProvider, JsonRpcSigner } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';
export declare class EthService {
    private readonly environmentService;
    private readonly provider;
    private readonly webSocketProvider;
    constructor(environmentService: EnvironmentService);
    getProvider(): JsonRpcProvider;
    getWebSocketProvider(): JsonRpcProvider;
    getSigner(indexOrPrivateKey?: number | string): Promise<JsonRpcSigner>;
}
