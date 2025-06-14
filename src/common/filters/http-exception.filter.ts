import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { ResponseStatus } from '../enums/response-status.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const errorMessage =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as { message?: string }).message ||
          exception.message
        : exception.message;

    response.status(status).json({
      status: ResponseStatus.ERROR,
      data: {
        statusCode: status,
        message: errorMessage,
      },
    });
  }
}
