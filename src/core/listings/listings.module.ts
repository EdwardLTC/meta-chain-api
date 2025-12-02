import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { EthModule } from '../../eth/eth.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [EthModule, TokensModule],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
