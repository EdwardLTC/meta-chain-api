import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly dbService: PrismaService) {}

  public like(userId: string, tokenId: string) {
    return this.dbService.$transaction(async tx => {
      await tx.tokenLike.upsert({
        where: { userId_tokenId: { userId, tokenId } },
        update: {},
        create: { userId, tokenId },
      });

      await tx.token.update({
        where: { id: tokenId },
        data: { likeCount: { increment: 1 } },
      });
    });
  }

  public unlike(userId: string, tokenId: string) {
    return this.dbService.$transaction(async tx => {
      await tx.tokenLike.delete({
        where: { userId_tokenId: { userId, tokenId } },
      });

      await tx.token.update({
        where: { id: tokenId },
        data: { likeCount: { decrement: 1 } },
      });
    });
  }
}
