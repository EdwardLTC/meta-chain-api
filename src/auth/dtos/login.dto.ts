import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: '0xb42482d95902560740d9c11a894f74e5b9522fdf',
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({
    type: String,
    example: '0xb42482d95902560740d9c11a894f74e5b9522fdf',
  })
  @IsString()
  @IsNotEmpty()
  signature: string;
}
