import { Module } from '@nestjs/common';
import { NftStorageService } from './nft-storage.service';

@Module({
  providers: [NftStorageService],
  exports: [NftStorageService],
})
export class NftStorageModule {}
