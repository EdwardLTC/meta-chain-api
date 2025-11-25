import { Injectable } from '@nestjs/common';
import { UpsertUserDto } from './dtos/upser.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private dbService: PrismaService) {}

  public async upsert(walletAddress: string, upsertUserDto: UpsertUserDto) {
    return this.dbService.user.upsert({
      where: {
        walletAddress: walletAddress,
      },
      update: {
        username: upsertUserDto.username,
        email: upsertUserDto.email,
        avatarUrl: upsertUserDto.avatarUrl,
        bio: upsertUserDto.bio,
      },
      create: {
        walletAddress: walletAddress,
        username: upsertUserDto.username!,
        email: upsertUserDto.email,
        avatarUrl: upsertUserDto.avatarUrl,
        bio: upsertUserDto.bio,
      },
    });
  }
}
