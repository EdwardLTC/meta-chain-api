import { IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiProperty({
    type: String,
    example: 'token-12345',
  })
  @IsString()
  tokenId: string;

  @ApiProperty({
    type: Number,
    example: 0.005,
  })
  @IsPositive()
  price: number;
}
