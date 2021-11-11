import { Module } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { HeartsController } from './hearts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Heart } from './entities/heart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Heart])],
  controllers: [HeartsController],
  providers: [HeartsService],
})
export class HeartsModule {}
