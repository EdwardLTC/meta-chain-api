import { Controller, Get, Param } from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('presign-upload-url/:filename')
  public async presignUploadUrl(@Param('filename') filename: string): Promise<{ uploadUrl: string; blobUrl: string }> {
    return this.mediaService.presignUploadUrl(filename);
  }
}
