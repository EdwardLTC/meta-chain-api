import { Body, Controller, Post } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dtos/create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../auth/auth.decorator';
import { SignContractDto } from './dtos/sign-contract.dto';

@ApiBearerAuth()
@Controller('collections')
export class CollectionsController {
  constructor(private svc: CollectionsService) {}

  @Post()
  async create(@Body() dto: CreateCollectionDto, @User('walletAddress') userWallet: string) {
    return this.svc.createCollection(dto, userWallet);
  }

  @Post('sign-contract')
  async signContract(@Body() dto: SignContractDto) {
    return this.svc.testSignContract(dto);
  }
}
