import { JsonRpcProvider, JsonRpcSigner, WebSocketProvider } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';
declare class JsonRpcProviderLogger extends JsonRpcProvider {
    send(method: string, params: Array<any>): Promise<any>;
}
declare class WebSocketProviderLogger extends WebSocketProvider {
    send(method: string, params: Array<any>): Promise<any>;
}
export declare class EthService {
    private readonly environmentService;
    private readonly provider;
    private readonly webSocketProvider;
    constructor(environmentService: EnvironmentService);
    getProvider(): JsonRpcProviderLogger;
    getWebSocketProvider(): WebSocketProviderLogger;
    getSigner(indexOrPrivateKey?: number | string): Promise<JsonRpcSigner>;
}
export {};
