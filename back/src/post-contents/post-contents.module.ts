import { Module } from '@nestjs/common';
import { PostContentsService } from './post-contents.service';
import { PostContentsController } from './post-contents.controller';

@Module({
  controllers: [PostContentsController],
  providers: [PostContentsService]
})
export class PostContentsModule {}
