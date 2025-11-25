import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTokensFilterDto {
  @ApiPropertyOptional({
    description: 'Filter tokens by collection ID',
    example: 'c1a2b3c4-d5e6-7f89-0a1b-2c3d4e5f6a7b',
  })
  @IsOptional()
  @IsString()
  collectionId?: string;
}
