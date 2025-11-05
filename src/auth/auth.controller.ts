import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  public getNonce(@Query('address') address: string) {
    return this.authService.getNonce(address);
  }
}
