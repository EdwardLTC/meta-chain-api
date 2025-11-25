import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractsService } from '../../eth/contracts.service';
import { TokensListenerService } from '../tokens/tokens-listener.service';
export declare class CollectionsListenerService implements OnModuleInit, OnModuleDestroy {
    private contracts;
    private prisma;
    private tokenListenerService;
    private readonly logger;
    private readonly contract;
    constructor(contracts: ContractsService, prisma: PrismaService, tokenListenerService: TokensListenerService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
}
