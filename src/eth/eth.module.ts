import { Module } from '@nestjs/common';
import { EthService } from './eth.service';
import { ContractsService } from './contracts.service';

@Module({
  providers: [EthService, ContractsService],
  exports: [EthService, ContractsService],
})
export class EthModule {}
