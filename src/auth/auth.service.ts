import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private nonces = new Map<string, string>(); // replace with redis
  private provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'); // optional

  constructor(private userService: UsersService) {}

  public getNonce(address: string) {
    const nonce = Math.floor(Math.random() * 1_000_000).toString();
    this.nonces.set(address.toLowerCase(), nonce);
    return { nonce };
  }

  public async verifySignature(address: string, signature: string) {
    const nonce = this.nonces.get(address.toLowerCase());
    if (!nonce) throw new UnauthorizedException('No nonce found');

    const recoveredAddress = ethers.verifyMessage(`Sign in nonce: ${nonce}`, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature');
    }

    const ensName = await this.provider.lookupAddress(address).catch(() => null);
    const balance = await this.provider
      .getBalance(address)
      .then(b => ethers.formatEther(b))
      .catch(() => null);

    await this.userService.upsertUser(address, {
      username: ensName || undefined,
      email: undefined,
      avatarUrl: undefined,
      bio: balance ? `Balance: ${balance} ETH` : undefined,
    });

    this.nonces.delete(address.toLowerCase());
    return;
  }
}
