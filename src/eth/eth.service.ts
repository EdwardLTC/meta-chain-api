import { Injectable } from '@nestjs/common';
import { JsonRpcProvider, JsonRpcSigner, Wallet, WebSocketProvider } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';

class JsonRpcProviderLogger extends JsonRpcProvider {
  public async send(method: string, params: Array<any>): Promise<any> {
    console.log(`[Infura Request] method=${method}, params=${JSON.stringify(params)}`);
    const result = await super.send(method, params);
    console.log(`[Infura Response] result=${JSON.stringify(result)}`);
    return result;
  }
}

class WebSocketProviderLogger extends WebSocketProvider {
  public async send(method: string, params: Array<any>): Promise<any> {
    console.log(`[Infura WS Request] method=${method}, params=${JSON.stringify(params)}`);
    const result = await super.send(method, params);
    console.log(`[Infura WS Response] result=${JSON.stringify(result)}`);
    return result;
  }
}

@Injectable()
export class EthService {
  private readonly provider: JsonRpcProviderLogger;
  private readonly webSocketProvider: WebSocketProviderLogger;

  constructor(private readonly environmentService: EnvironmentService) {
    this.provider = new JsonRpcProviderLogger(this.environmentService.ProviderNodeUrl);
    this.webSocketProvider = new WebSocketProviderLogger(this.environmentService.ProviderWsNodeUrl);
  }

  public getProvider() {
    return this.provider;
  }

  public getWebSocketProvider() {
    return this.webSocketProvider;
  }

  public async getSigner(indexOrPrivateKey?: number | string): Promise<JsonRpcSigner> {
    if (typeof indexOrPrivateKey === 'number') {
      return await this.provider.getSigner(indexOrPrivateKey);
    }
    if (typeof indexOrPrivateKey === 'string') {
      const wallet = new Wallet(indexOrPrivateKey, this.provider);
      return wallet as unknown as JsonRpcSigner;
    }
    return await this.provider.getSigner(0);
  }
}
