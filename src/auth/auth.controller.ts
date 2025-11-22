import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { LoginDto } from './dtos/login.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  public getNonce(@Query('address') address: string) {
    return this.authService.getNonce(address);
  }

  @Post('verify')
  public async verifySignature(@Body() loginDto: LoginDto) {
    return {
      token: await this.authService.verifySignature(loginDto.walletAddress, loginDto.signature),
    };
  }

  @Post('dev-only/generate-jwt')
  public async generateSignature() {
    return this.authService.generateSignature();
  }

  @Post('dev-only/generate-jwt-private-key/:privateKey')
  public signatureWithPrivateKey(@Query('privateKey') address: string) {
    return this.authService.signatureWithPrivateKey(address);
  }
}
