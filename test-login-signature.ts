import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!);
const message = 'Sign in nonce: 6eb7f27f74c422664860da08af6eecf3';

void wallet.signMessage(message).then(console.log);
