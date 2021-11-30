import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
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
