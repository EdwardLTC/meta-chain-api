import { Injectable } from '@nestjs/common';
import { EthService } from '../eth/eth.service';
import { Contract } from 'ethers';

@Injectable()
export class AppService {
  constructor(private eth: EthService) {}

  public async testSignContract(txData: { to: string; data: string; value: string }, privateKey: string) {
    const wallet = await this.eth.getSigner(privateKey);

    const tx = await wallet.sendTransaction({
      to: txData.to,
      data: txData.data,
      gasLimit: 16777215,
      value: txData.value ? BigInt(txData.value) : 0,
    });

    return tx.wait();
  }

  public async approveAllNftForMarketplace(contractAddress: string, privateKey: string) {
    const wallet = await this.eth.getSigner(privateKey);
    const erc721Abi = [
      'function isApprovedForAll(address owner, address operator) view returns (bool)',
      'function setApprovalForAll(address operator, bool _approved)',
    ];

    // 4. Tạo contract instance
    const nftContract = new Contract(contractAddress, erc721Abi, wallet);

    // 5. Kiểm tra đã approve all chưa
    const isApproved = await nftContract.isApprovedForAll(wallet.address, '0x3836559F707687901c5955deC4840Be5cC011597');
    console.log('Approved already?', isApproved);

    if (!isApproved) {
      console.log('Approving all NFT for marketplace...');

      // 6. Gọi setApprovalForAll
      const tx = await nftContract.setApprovalForAll('0x3836559F707687901c5955deC4840Be5cC011597', true);
      console.log('Transaction hash:', tx.hash);

      // 7. Chờ mined
      return tx.wait();
    } else {
      return {
        message: 'Already approved',
      };
    }
  }
}
