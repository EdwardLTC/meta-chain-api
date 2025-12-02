import { Injectable } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';
import { PinataSDK } from 'pinata';

@Injectable()
export class NftStorageService {
  private client: PinataSDK;

  constructor(private readonly environmentService: EnvironmentService) {
    this.client = new PinataSDK({
      pinataJwt: this.environmentService.pinata.apiKey,
      pinataGateway: this.environmentService.pinata.gateway,
    });
  }

  public async uploadMetadata(data: object, name: string): Promise<string> {
    const response = await this.client.upload.public.json(data).name(name);

    return `ipfs://${response.cid}`;
  }
}
