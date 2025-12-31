import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { RedisService } from '../redis/redis.service';
import { randomBytes } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/users/users.service';
import { SiweMessage } from 'siwe';

@Injectable()
export class AuthService {
  private readonly domain = 'meta-chain-api.indonesiacentral.cloudapp.azure.com';
  constructor(
    private userService: UsersService,
    private redis: RedisService,
    private jwtService: JwtService,
  ) {}

  public async getNonce(address: string) {
    const key = `auth:nonce:${address.toLowerCase()}`;
    const existing = await this.redis.get(key);

    if (existing) {
      return { message: existing };
    }

    const nonce = randomBytes(16).toString('hex');

    const message = new SiweMessage({
      domain: this.domain,
      address: address,
      uri: 'https://meta-chain-api.indonesiacentral.cloudapp.azure.com',
      version: '1',
      chainId: 1,
      nonce,
      issuedAt: new Date().toISOString(),
    }).prepareMessage();

    await this.redis.set(`auth:siwe:${address.toLowerCase()}`, message, 300);

    return {
      message: message,
    };
  }

  public async verifySignature(address: string, signature: string) {
    const key = `auth:siwe:${address.toLowerCase()}`;
    const stored = await this.redis.get(key);

    if (!stored) {
      throw new UnauthorizedException('No SIWE message found');
    }

    const siweMessage = new SiweMessage(stored);

    const fields = await siweMessage.verify({
      signature,
      domain: this.domain,
    });

    if (fields.data.address.toLowerCase() !== address.toLowerCase()) {
      throw new UnauthorizedException('Invalid address');
    }

    await this.redis.del(key);

    const user = await this.userService.upsert(address, {
      username: address,
    });

    return this.jwtService.sign({
      sub: address,
      userId: user.id,
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
