import { Module } from '@nestjs/common';
import { LikedsService } from './likeds.service';
import { LikedsController } from './likeds.controller';

@Module({
  controllers: [LikedsController],
  providers: [LikedsService]
})
export class LikedsModule {}
