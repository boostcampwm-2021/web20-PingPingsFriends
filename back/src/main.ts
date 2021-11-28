import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { loggerEnv } from 'config/logger.config';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(loggerEnv));
  if (process.env.NODE_ENV === 'dev') app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['docs'] });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle(`PingPing's Friends`)
    .setDescription(`The PingPing's friends API description`)
    .setVersion('0.1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'Header' },
      'access-token'
    )
    .addCookieAuth('auth-cookie', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer',
    })
    .addTag('pingpings')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
