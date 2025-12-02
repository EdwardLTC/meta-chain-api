import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignContractDto } from './dtos/sign-contract.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-contract-dev-only/:privateKey')
  public async signContract(@Body() dto: SignContractDto, @Param('privateKey') privateKey: string) {
    return this.appService.testSignContract(dto, privateKey);
  }
}
