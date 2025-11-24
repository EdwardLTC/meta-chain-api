import { Injectable } from '@nestjs/common';
import { EthService } from './eth.service';
import fs from 'fs';
import path from 'path';
import { Contract, InterfaceAbi } from 'ethers';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class ContractsService {
  private deployments: Record<string, { address: string; abi: InterfaceAbi }> | null = null;
  private contractCache: Record<string, Contract> = {};

  constructor(
    private eth: EthService,
    private environmentService: EnvironmentService,
  ) {
    this.loadDeployments();
  }

  public getAbi(name: string) {
    if (!this.deployments || !this.deployments[name]) {
      throw new Error(`Contract ${name} not found in deployments`);
    }
    return this.deployments[name].abi || null;
  }

  public getProvider() {
    return this.eth.getProvider();
  }

  public loadDeployments() {
    const file = path.join(process.cwd(), 'deployments', this.environmentService.isProduction ? 'sepolia.json' : 'localhost.json');
    if (!fs.existsSync(file)) {
      throw new Error('Deployments file not found: ' + file);
    }
    try {
      const raw = fs.readFileSync(file, 'utf-8');
      this.deployments = JSON.parse(raw).contracts || JSON.parse(raw);
    } catch (e) {
      throw new Error('Failed to parse deployments file: ' + e.message);
    }
  }

  public getContract(name: string): Contract {
    if (this.contractCache[name]) {
      return this.contractCache[name];
    }

    if (!this.deployments || !this.deployments[name]) {
      throw new Error(`Contract ${name} not found in deployments`);
    }
    const info = this.deployments[name];
    if (!info.abi || !info.address) {
      throw new Error(`Contract ${name} is missing ABI or address`);
    }

    this.contractCache[name] = new Contract(info.address, info.abi, this.getProvider());
    return this.contractCache[name];
  }
}
