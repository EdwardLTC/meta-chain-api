import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService) {}

  public get environment(): string {
    return <string>this.configService.get<string>('NODE_ENV');
  }

  public get port(): number {
    return <number>this.configService.get<number>('PORT');
  }

  public get jwtSecret(): string {
    return <string>this.configService.get<string>('JWT_SECRET');
  }

  public get dbConnectionString(): string {
    return <string>this.configService.get<string>('DATABASE_URL');
  }

  public get redisConnection() {
    return {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    };
  }

  public get ProviderNodeUrl(): string {
    return <string>this.configService.get<string>('PROVIDER_NODE_URL');
  }

  public get isProduction(): boolean {
    return this.environment === 'production';
  }

  public get nftStorageApiKey(): string {
    return <string>this.configService.get<string>('NFT_STORAGE_API_KEY');
  }

  public get pinata(): { apiKey: string; gateway: string } {
    return {
      apiKey: <string>this.configService.get<string>('PINATA_API_KEY_JWT'),
      gateway: <string>this.configService.get<string>('PINATA_GATEWAY_URL'),
    };
  }
}
