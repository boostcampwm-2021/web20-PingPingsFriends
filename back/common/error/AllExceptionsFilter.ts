import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
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
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = (exception as any).response.message;
    } else if (exception instanceof TypeORMError) {
      message = 'DB 애러입니다.';
      status = HttpStatus.SERVICE_UNAVAILABLE;
    } else {
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
