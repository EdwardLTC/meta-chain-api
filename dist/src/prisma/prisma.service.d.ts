import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.mjs';
import { EnvironmentService } from '../environment/environment.service';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private environmentService;
    constructor(environmentService: EnvironmentService);
    onModuleInit(): Promise<void>;
}
