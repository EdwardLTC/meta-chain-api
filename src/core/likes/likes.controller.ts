import { Controller, Delete, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../auth/auth.decorator';

@ApiBearerAuth()
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':tokenId')
  public async likeCollection(@Param('tokenId') collectionId: string, @User('userId') userId: string) {
    await this.likesService.like(userId, collectionId);
    return { message: 'Token liked successfully' };
  }

  @Delete(':tokenId')
  public async unlikeCollection(@Param('tokenId') collectionId: string, @User('userId') userId: string) {
    await this.likesService.unlike(userId, collectionId);
    return { message: 'Token unliked successfully' };
  }
}
