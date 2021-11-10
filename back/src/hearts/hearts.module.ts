import { Module } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { HeartsController } from './hearts.controller';

@Module({
  controllers: [HeartsController],
  providers: [HeartsService]
})
export class HeartsModule {}
