import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractsService } from '../../eth/contracts.service';
import { TokensListener } from '../tokens/tokens.listener';
export declare class CollectionsListener implements OnModuleInit, OnModuleDestroy {
    private contracts;
    private prisma;
    private tokenListenerService;
    private readonly logger;
    private readonly contract;
    constructor(contracts: ContractsService, prisma: PrismaService, tokenListenerService: TokensListener);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
}
