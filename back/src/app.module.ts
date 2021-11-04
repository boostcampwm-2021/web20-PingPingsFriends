import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [UsersModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
