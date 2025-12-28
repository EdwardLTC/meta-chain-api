import { Injectable } from '@nestjs/common';
import { UpdateProfileDto, UpsertUserDto } from './dtos/upser.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { EthService } from '../../eth/eth.service';
import { ethers } from 'ethers';

@Injectable()
export class UsersService {
  constructor(
    private dbService: PrismaService,
    private ethService: EthService,
  ) {}

  public async upsert(walletAddress: string, upsertUserDto: UpsertUserDto) {
    return this.dbService.user.upsert({
      where: {
        walletAddress: walletAddress,
      },
      update: {},
      create: {
        walletAddress: walletAddress,
        username: upsertUserDto.username!,
        email: upsertUserDto.email,
        avatarUrl: upsertUserDto.avatarUrl,
        bio: upsertUserDto.bio,
      },
    });
  }

  public async getProfile(userId: string) {
    const profile = await this.dbService.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const totalCollections = await this.dbService.collection.count({
      where: {
        userId: userId,
      },
    });

    const totalTokens = await this.dbService.token.count({
      where: {
        ownerAddress: profile.walletAddress,
      },
    });

    return {
      profile,
      totalCollections,
      totalTokens,
    };
  }

  public async updateProfile(userId: string, updateUserDto: UpdateProfileDto) {
    return this.dbService.user.update({
      where: {
        id: userId,
      },
      data: {
        username: updateUserDto.username,
        email: updateUserDto.email,
        avatarUrl: updateUserDto.avatarUrl,
        bio: updateUserDto.bio,
      },
    });
  }

  public async getBalance(walletAddress: string) {
    const balanceWei = await this.ethService.getProvider().getBalance(walletAddress);
    return ethers.formatEther(balanceWei);
  }
}
