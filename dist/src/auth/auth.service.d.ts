import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/users/users.service';
export declare class AuthService {
    private userService;
    private redis;
    private jwtService;
    constructor(userService: UsersService, redis: RedisService, jwtService: JwtService);
    getNonce(address: string): Promise<{
        message: string;
    }>;
    verifySignature(address: string, signature: string): Promise<string>;
    signatureWithPrivateKey(privateKey: string): Promise<string>;
}
