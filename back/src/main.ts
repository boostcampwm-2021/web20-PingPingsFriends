import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { loggerEnv } from 'config/logger.config';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from 'config/swagger.config';
import { AllExceptionsFilter } from 'common/error/AllExceptionsFilter';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(loggerEnv));
  if (process.env.NODE_ENV === 'dev') app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['docs'] });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
