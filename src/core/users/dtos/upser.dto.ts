import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpsertUserDto {
  username?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'lethanhcong06062003@gmail.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'The avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'The bio of the user',
    example: 'Hello! I am John Doe, a software developer.',
  })
  @IsString()
  @IsOptional()
  bio?: string;
}
