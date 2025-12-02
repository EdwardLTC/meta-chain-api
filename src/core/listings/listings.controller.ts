import { Body, Controller, Post } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateListingDto } from './dtos/create.dto';
import { User } from '../../auth/auth.decorator';

@ApiBearerAuth()
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  public async createListing(@Body() body: CreateListingDto, @User('walletAddress') userWallet: string) {
    return this.listingsService.createListing(body, userWallet);
  }
}
