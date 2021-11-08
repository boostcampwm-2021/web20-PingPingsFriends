import { Module } from '@nestjs/common';
import { LikedService } from './liked.service';
import { LikedController } from './liked.controller';

@Module({
  controllers: [LikedController],
  providers: [LikedService]
})
export class LikedModule {}
