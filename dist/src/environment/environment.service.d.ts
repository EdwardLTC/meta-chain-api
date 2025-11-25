import { ConfigService } from '@nestjs/config';
export declare class EnvironmentService {
    private configService;
    constructor(configService: ConfigService);
    get environment(): string;
    get port(): number;
    get jwtSecret(): string;
    get dbConnectionString(): string;
    get redisConnection(): {
        host: string | undefined;
        port: number | undefined;
    };
    get ProviderNodeUrl(): string;
    get isProduction(): boolean;
    get nftStorageApiKey(): string;
    get pinata(): {
        apiKey: string;
        gateway: string;
    };
}
