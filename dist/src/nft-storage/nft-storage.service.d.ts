import { EnvironmentService } from '../environment/environment.service';
export declare class NftStorageService {
    private readonly environmentService;
    private client;
    constructor(environmentService: EnvironmentService);
    uploadMetadata(data: object, name: string): Promise<string>;
}
