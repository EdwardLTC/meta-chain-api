import { AppService } from './app.service';
import { SignContractDto } from './dtos/sign-contract.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    signContract(dto: SignContractDto, privateKey: string): Promise<import("ethers").TransactionResponse>;
}
