import { Body, Controller, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../auth/auth.decorator';
import { UpdateProfileDto } from './dtos/upser.dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  public async getProfile(@User('userId') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put()
  public async updateProfile(@User('userId') userId: string, @Body() updateUserDto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @Get('balance')
  public async getBalance(@User('walletAddress') walletAddress: string) {
    return {
      balance: await this.usersService.getBalance(walletAddress),
    };
  }
}
