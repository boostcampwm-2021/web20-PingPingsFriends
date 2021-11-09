import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
