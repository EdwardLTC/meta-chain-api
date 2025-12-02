import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ListingsListener implements OnModuleInit, OnModuleDestroy {
    private contracts;
    private prisma;
    private readonly logger;
    private readonly marketplace;
    constructor(contracts: ContractsService, prisma: PrismaService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
}
