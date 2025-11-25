import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ContractsService } from '../../eth/contracts.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class TokensListenerService implements OnModuleInit, OnModuleDestroy {
    private contracts;
    private prisma;
    private readonly logger;
    private readonly factoryContract;
    private collectionContracts;
    constructor(contracts: ContractsService, prisma: PrismaService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    addCollectionListener(collectionAddress: string): Promise<void>;
}
