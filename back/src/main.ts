import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['docs'] });
  const config = new DocumentBuilder()
    .setTitle(`PingPing's Friends`)
    .setDescription(`The PingPing's friends API description`)
    .setVersion('1.0')
    .addTag('pingpings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
