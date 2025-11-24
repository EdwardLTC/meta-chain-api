import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EnvironmentService } from '../environment/environment.service';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private environmentService;
    private client;
    constructor(environmentService: EnvironmentService);
    onModuleInit(): void;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<number>;
    onModuleDestroy(): Promise<void>;
}
