import { Strategy } from 'passport-jwt';
import { EnvironmentService } from '../environment/environment.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(environmentService: EnvironmentService);
    validate(payload: any): {
        sub: any;
        walletAddress: any;
        userId: any;
    };
}
export {};
