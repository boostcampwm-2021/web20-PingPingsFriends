import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { userProviders } from 'src/users/users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [S3Controller],
  providers: [...userProviders, S3Service],
  exports: [S3Service],
})
export class S3Module {}
