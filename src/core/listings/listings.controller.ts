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
  public async createListing(@Body() body: CreateListingDto, @User('walletAddress') userWallet: string, @User('userId') userId: string) {
    return this.listingsService.createListing(body, userWallet, userId);
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

  @Post(':id/buy')
  @HttpCode(HttpStatus.OK)
  public async buyListing(@Param('id') id: string, @User('walletAddress') userWallet: string) {
    return this.listingsService.buyListing(id, userWallet);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  public async cancelListing(@Param('id') id: string, @User('walletAddress') userWallet: string) {
    return this.listingsService.cancelListing(id, userWallet);
  }

  @Get('histories')
  @HttpCode(HttpStatus.OK)
  public async getListingHistories(@User('walletAddress') userWallet: string) {
    return this.listingsService.historiesOfUser(userWallet);
  }
}
