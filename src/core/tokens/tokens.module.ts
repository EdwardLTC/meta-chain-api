import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TokensListener } from './tokens.listener';
import { CollectionsModule } from '../collections/collections.module';
import { NftStorageModule } from '../../nft-storage/nft-storage.module';
import { EthModule } from '../../eth/eth.module';

@Module({
  imports: [forwardRef(() => CollectionsModule), NftStorageModule, EthModule],
  controllers: [TokensController],
  providers: [TokensService, TokensListener],
  exports: [TokensService, TokensListener],
})
export class TokensModule {}
