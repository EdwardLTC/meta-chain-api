import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    description: 'Name of the collection',
    example: 'My NFT Collection',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Symbol of the collection',
    example: 'MNFT',
  })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({
    description: 'Description of the collection',
    example: 'This is my first NFT collection.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Image URL of the collection',
    example: 'https://i2c.seadn.io/ethereum/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/9762e02e760c6c3644f2b32d8e1aef36.png?w=350',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Royalty fee in basis points',
    example: 500,
  })
  @IsNotEmpty()
  @IsNumber()
  royaltyFeeBps: number;
}
