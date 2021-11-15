import { Module } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { HeartsController } from './hearts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeartRepository } from './heart.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HeartRepository])],
  controllers: [HeartsController],
  providers: [HeartsService],
})
export class HeartsModule {}
