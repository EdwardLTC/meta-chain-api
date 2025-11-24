import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getNonce(address: string): Promise<{
        message: string;
    }>;
    verifySignature(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    generateSignature(): Promise<string>;
    signatureWithPrivateKey(address: string): Promise<string>;
}
