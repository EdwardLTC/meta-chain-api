import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { EthModule } from '../eth/eth.module';
import { CollectionsListenerService } from './collections-listener.service';
import { CollectionsController } from './collections.controller';

@Module({
  imports: [EthModule],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsListenerService],
  exports: [CollectionsService, CollectionsListenerService],
})
export class CollectionsModule {}
