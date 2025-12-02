import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsListener } from './collections.listener';
import { CollectionsController } from './collections.controller';
import { EthModule } from '../../eth/eth.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [EthModule, TokensModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsListener],
  exports: [CollectionsService, CollectionsListener],
})
export class CollectionsModule {}
