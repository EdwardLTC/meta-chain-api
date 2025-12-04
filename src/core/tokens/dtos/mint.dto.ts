import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MintTokenDto {
  @ApiProperty({
    description: 'The ID of the collection to which the token will be minted',
    example: 'collection_12345',
  })
  @IsString()
  @IsNotEmpty()
  collectionId: string;

  @ApiProperty({
    description: 'The name of the token',
    example: 'My Unique Token',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A brief description of the token',
    example: 'This token represents a unique digital asset.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The URL of the image associated with the token',
    example: 'https://i2c.seadn.io/ethereum/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/9762e02e760c6c3644f2b32d8e1aef36.png?w=350',
  })
  @IsUrl()
  image: string;
}
