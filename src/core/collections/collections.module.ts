import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsListenerService } from './collections-listener.service';
import { CollectionsController } from './collections.controller';
import { EthModule } from '../../eth/eth.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [EthModule, TokensModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsListenerService],
  exports: [CollectionsService, CollectionsListenerService],
})
export class CollectionsModule {}
