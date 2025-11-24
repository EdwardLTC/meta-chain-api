import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractsService } from '../eth/contracts.service';
export declare class CollectionsListenerService implements OnModuleInit, OnModuleDestroy {
    private contracts;
    private prisma;
    private readonly logger;
    private readonly contract;
    constructor(contracts: ContractsService, prisma: PrismaService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
}
