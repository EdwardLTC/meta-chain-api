import { PrismaService } from '../prisma/prisma.service';
export declare class AppService {
    private dbService;
    constructor(dbService: PrismaService);
    getHello(): import("../../generated/prisma/internal/prismaNamespace.mjs", { with: { "resolution-mode": "import" } }).PrismaPromise<{
        id: string;
        username: string;
        walletAddress: string;
        email: string | null;
        avatarUrl: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
