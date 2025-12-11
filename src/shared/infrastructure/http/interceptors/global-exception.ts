import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponseFormatter } from '../api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal error...';
    let errors: string[] | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse() as any;

      if (typeof res === 'string') {
        message = res;
      } else {
        message = res.message || exception.message;
        errors = res.errors || res.message;
      }
    } else if (exception instanceof Error) {
      status = 400;
      message = exception.message;
    }

    response.status(status).json(ApiResponseFormatter.error(message, errors));
  }
}
