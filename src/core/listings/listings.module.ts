import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { EthModule } from '../../eth/eth.module';
import { TokensModule } from '../tokens/tokens.module';
import { ListingsListener } from './listings.listener';

@Module({
  imports: [EthModule, TokensModule],
  controllers: [ListingsController],
  providers: [ListingsService, ListingsListener],
  exports: [ListingsService, ListingsListener],
})
export class ListingsModule {}
