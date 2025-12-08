import { Injectable } from '@nestjs/common';
import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class AzureStorageService {
  private blobServiceClient: BlobServiceClient;

  constructor(private envService: EnvironmentService) {
    const sharedKeyCredential = new StorageSharedKeyCredential(this.envService.azure.accountName, this.envService.azure.accountKey);
    this.blobServiceClient = new BlobServiceClient(`https://${this.envService.azure.accountName}.blob.core.windows.net`, sharedKeyCredential);
  }

  public async presignUploadUrl(containerName: string, blobName: string, expiryMinutes: number) {
    const containerClient = this.blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const sasUrl = await blobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse('cw'),
      expiresOn: new Date(new Date().valueOf() + expiryMinutes * 60 * 1000),
    });

    return {
      uploadUrl: sasUrl,
      blobUrl: blobClient.url,
    };
  }
}
