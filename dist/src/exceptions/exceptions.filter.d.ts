import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ExceptionsFilter implements ExceptionFilter {
    private logger;
    catch(exception: HttpException | Error, host: ArgumentsHost): void;
}
