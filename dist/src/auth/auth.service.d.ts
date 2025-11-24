import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { EthService } from '../eth/eth.service';
export declare class AuthService {
    private userService;
    private ethService;
    private redis;
    private jwtService;
    constructor(userService: UsersService, ethService: EthService, redis: RedisService, jwtService: JwtService);
    getNonce(address: string): Promise<{
        message: string;
    }>;
    verifySignature(address: string, signature: string): Promise<string>;
    generateSignature(): Promise<string>;
    signatureWithPrivateKey(privateKey: string): Promise<string>;
}
