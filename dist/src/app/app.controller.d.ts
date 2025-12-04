import { AppService } from './app.service';
import { SignContractDto } from './dtos/sign-contract.dto';
import { AuthService } from '../auth/auth.service';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    signContract(dto: SignContractDto, privateKey: string): Promise<import("ethers").TransactionResponse>;
    signatureWithPrivateKey(address: string): Promise<string>;
}
