import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TokensListenerService } from './tokens-listener.service';
import { CollectionsModule } from '../collections/collections.module';
import { NftStorageModule } from '../../nft-storage/nft-storage.module';
import { EthModule } from '../../eth/eth.module';

@Module({
  imports: [forwardRef(() => CollectionsModule), NftStorageModule, EthModule],
  controllers: [TokensController],
  providers: [TokensService, TokensListenerService],
  exports: [TokensService, TokensListenerService],
})
export class TokensModule {}
