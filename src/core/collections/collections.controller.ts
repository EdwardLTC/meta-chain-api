import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../auth/auth.decorator';
import { GetCollectionsQuery } from './dtos/get-collections.dto';

@ApiBearerAuth()
@Controller('collections')
export class CollectionsController {
  constructor(private svc: CollectionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getCollections(@Query() getCollectionsQuery: GetCollectionsQuery, @User('userId') userId: string) {
    return this.svc.getCollections(getCollectionsQuery, userId);
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
