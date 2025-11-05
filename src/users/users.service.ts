import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertUserDto } from './dtos/upser.dto';

@Injectable()
export class UsersService {
  constructor(private dbService: PrismaService) {}

  public async upsertUser(walletAddress: string, upserUserDto: UpsertUserDto) {
    return this.dbService.user.upsert({
      where: {
        walletAddress: walletAddress,
      },
      update: {
        username: upserUserDto.username,
        email: upserUserDto.email,
        avatarUrl: upserUserDto.avatarUrl,
        bio: upserUserDto.bio,
      },
      create: {
        walletAddress: walletAddress,
        username: upserUserDto.username,
        email: upserUserDto.email,
        avatarUrl: upserUserDto.avatarUrl,
        bio: upserUserDto.bio,
      },
    });
  }
}
