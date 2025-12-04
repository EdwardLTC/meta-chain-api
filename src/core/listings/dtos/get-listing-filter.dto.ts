import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetListingFilterDto {
  @ApiPropertyOptional({
    type: Boolean,
    example: true,
    description: 'If true, only listing owned by the authenticated user will be returned',
  })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  isMe?: boolean;
}
