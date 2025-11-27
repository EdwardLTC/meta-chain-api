import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(ExceptionsFilter.name);

  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let responseBody: { statusCode: HttpStatus; timestamp: Date; message: string; cause: unknown } = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date(),
      message: 'Something went wrong',
      cause: null,
    };

    if (exception instanceof HttpException) {
      responseBody = {
        statusCode: exception.getStatus(),
        timestamp: new Date(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        message: exception.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR ? 'Something went wrong' : exception.getResponse()['message'],
        cause: exception?.cause || null,
      };
    }

    if (responseBody.statusCode !== HttpStatus.NOT_FOUND) {
      this.logger.error(`[${req.method}] ${req.path} [Error] >> Message:: ${exception.toString()}`, exception.stack);
    }

    response.status(responseBody.statusCode).json(responseBody);
  }
}
