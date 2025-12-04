import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetCollectionsQuery {
  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    description: 'If true, only collections owned by the authenticated user will be returned',
  })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  isMe?: boolean;
}
