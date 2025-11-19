import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignContractDto {
  @ApiProperty({
    description: 'The address of the contract to sign the transaction for',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: 'The data payload of the transaction to be signed',
    example: '0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
  })
  @IsString()
  @IsNotEmpty()
  data: string;
}
