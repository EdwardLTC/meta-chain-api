import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../auth/auth.decorator';
import { GetCollectionsQuery } from './dtos/get-collections.dto';
import { UpdateDto } from './dtos/update.dto';

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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async updateCollection(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.svc.updateRoyaltyInfo(id, dto.royaltyFeeBps);
  }

  @Put(':id/approve')
  @HttpCode(HttpStatus.OK)
  public async approveCollectionForMarketplace(collectionAddress: string) {
    return this.svc.approveCollectionForMarketplace(collectionAddress);
  }

  @Get(':id/approved')
  @HttpCode(HttpStatus.OK)
  public async isCollectionApprovedForMarketplace(@Param('id') id: string, @User('walletAddress') ownerAddress: string) {
    return {
      approved: await this.svc.isCollectionApprovedForMarketplace(id, ownerAddress),
    };
  }
}
