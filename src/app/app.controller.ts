import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SignContractDto } from './dtos/sign-contract.dto';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('dev-only/sign-contract/:privateKey')
  public async signContract(@Body() dto: SignContractDto, @Param('privateKey') privateKey: string) {
    return this.appService.testSignContract(dto, privateKey);
  }

  @Post('dev-only/jwt/:privateKey')
  public signatureWithPrivateKey(@Query('privateKey') address: string) {
    return this.authService.signatureWithPrivateKey(address);
  }
}
