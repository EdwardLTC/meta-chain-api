import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SignContractDto } from './dtos/sign-contract.dto';
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

  @Post('sign-contract-dev-only/:privateKey')
  public async signContract(@Body() dto: SignContractDto, @Param('privateKey') privateKey: string) {
    return this.svc.testSignContract(dto, privateKey);
  }
}
