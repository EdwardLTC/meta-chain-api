import { Injectable } from '@nestjs/common';
import { AzureStorageService } from '../azure/azure-storage.service';
import { uuidv7 } from '../ultils/uuid';

@Injectable()
export class MediaService {
  constructor(private readonly azureStorageService: AzureStorageService) {}

  public async presignUploadUrl(filename: string): Promise<{ uploadUrl: string; blobUrl: string }> {
    return this.azureStorageService.presignUploadUrl('media', filename + '-' + uuidv7(), 15);
  }
}
