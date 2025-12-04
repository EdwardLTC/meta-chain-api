import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MintTokenDto } from './dtos/mint.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../auth/auth.decorator';
import { GetTokensFilterDto } from './dtos/get-tokens-filter.dto';

@ApiBearerAuth()
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTokens(@Query() filter: GetTokensFilterDto, @User('walletAddress') userId: string) {
    return this.tokensService.getTokens(filter, userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getToken(@Param('id') id: string) {
    return this.tokensService.getToken(id);
  }

  @Post('mint')
  @HttpCode(HttpStatus.OK)
  async mintToken(@Body() data: MintTokenDto, @User('walletAddress') walletAddress: string, @User('userId') userId: string) {
    return this.tokensService.mintToken(data, walletAddress, userId);
  }
}
