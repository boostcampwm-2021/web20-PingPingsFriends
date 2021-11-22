import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FollowRepository])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
