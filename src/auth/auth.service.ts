import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { RedisService } from '../redis/redis.service';
import { randomBytes } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private redis: RedisService,
    private jwtService: JwtService,
  ) {}

  public async getNonce(address: string) {
    const key = `auth:nonce:${address.toLowerCase()}`;
    const existing = await this.redis.get(key);

    if (existing) {
      return { message: `Sign in nonce: ${existing}` };
    }

    const nonce = randomBytes(16).toString('hex');
    await this.redis.set(key, nonce, 300);

    return {
      message: `Sign in nonce: ${nonce}`,
    };
  }

  public async verifySignature(address: string, signature: string) {
    const key = `auth:nonce:${address.toLowerCase()}`;
    const nonce = await this.redis.get(key);
    if (!nonce) throw new UnauthorizedException('No nonce found');

    const recoveredAddress = ethers.verifyMessage(`Sign in nonce: ${nonce}`, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature');
    }

    await this.redis.del(key);

    await this.userService.upsert(address, {
      username: address,
    });

    return this.jwtService.sign({
      sub: address,
      walletAddress: address.toLowerCase(),
    });
  }

  public async signatureWithPrivateKey(privateKey: string) {
    const wallet = new ethers.Wallet(privateKey);

    const user = await this.userService.upsert(wallet.address, {
      username: wallet.address,
    });

    return this.jwtService.sign({
      sub: wallet.address,
      userId: user.id,
      walletAddress: wallet.address.toLowerCase(),
    });
  }
}
