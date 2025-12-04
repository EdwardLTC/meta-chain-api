import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateListingDto } from './dtos/create.dto';
import { User } from '../../auth/auth.decorator';
import { GetListingFilterDto } from './dtos/get-listing-filter.dto';

@ApiBearerAuth()
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createListing(@Body() body: CreateListingDto, @User('walletAddress') userWallet: string) {
    return this.listingsService.createListing(body, userWallet);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getListings(@Query() query: GetListingFilterDto, @User('walletAddress') userWallet: string) {
    return this.listingsService.getListings(query, userWallet);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getListingById(@Param('id') id: string) {
    return this.listingsService.getListing(id);
  }
}
