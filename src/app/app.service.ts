import { Injectable } from '@nestjs/common';
import { EthService } from '../eth/eth.service';

@Injectable()
export class AppService {
  constructor(private eth: EthService) {}

  public async testSignContract(txData: { to: string; data: string; value?: string }, privateKey: string) {
    const wallet = await this.eth.getSigner(privateKey);

    const tx = await wallet.sendTransaction({
      to: txData.to,
      data: txData.data,
      gasLimit: 16777215,
      value: txData.value ? BigInt(txData.value) : 0,
    });

    return tx.wait();
  }
}
