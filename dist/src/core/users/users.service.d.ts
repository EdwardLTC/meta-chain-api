import { UpsertUserDto } from './dtos/upser.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private dbService;
    constructor(dbService: PrismaService);
    upsert(walletAddress: string, upsertUserDto: UpsertUserDto): Promise<{
        id: string;
        username: string;
        walletAddress: string;
        email: string | null;
        avatarUrl: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
