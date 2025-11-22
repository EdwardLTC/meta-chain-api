import { Injectable } from '@nestjs/common';
import { JsonRpcProvider, JsonRpcSigner, Wallet } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class EthService {
  private readonly provider: JsonRpcProvider;

  constructor(private readonly environmentService: EnvironmentService) {
    this.provider = new JsonRpcProvider(this.environmentService.ProviderNodeUrl);
  }

  public getProvider() {
    return this.provider;
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
