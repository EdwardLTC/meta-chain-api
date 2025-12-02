import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../auth/auth.decorator';

@ApiBearerAuth()
@Controller('collections')
export class CollectionsController {
  constructor(private svc: CollectionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getCollections() {
    return this.svc.getCollections();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getCollection(@Param('id') id: string) {
    return this.svc.getCollection(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateCollectionDto, @User('walletAddress') userWallet: string, @User('userId') userId: string) {
    return this.svc.createCollection(dto, userWallet, userId);
  }
}
