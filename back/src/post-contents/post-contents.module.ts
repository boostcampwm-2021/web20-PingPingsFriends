import { Module } from '@nestjs/common';
import { PostContentsService } from './post-contents.service';
import { PostContentsController } from './post-contents.controller';
import { postContentProviders } from './post-contents.provider';
import { PostContent } from './entities/post-content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostContent])],
  controllers: [PostContentsController],
  providers: [PostContentsService],
})
export class PostContentsModule {}
