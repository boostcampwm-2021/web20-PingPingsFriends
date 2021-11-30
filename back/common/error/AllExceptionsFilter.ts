import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let message = '';
    let status = 200;
    process.env.NODE_ENV === 'dev' && console.log(exception);
    switch (exception.constructor) {
      case HttpException:
      case BadRequestException:
      case NotFoundException:
        status = exception.getStatus();
        message = (exception as any).response.message;
        break;
      case QueryFailedError:
        message = 'DB 애러입니다.';
        status = HttpStatus.SERVICE_UNAVAILABLE;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'internal server error';
    }
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
