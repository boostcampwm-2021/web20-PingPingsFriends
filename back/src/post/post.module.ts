import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Content } from 'src/contents/entities/content.entity';
import { Heart } from 'src/hearts/entities/heart.entity';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostContent,
      Content,
      Heart,
      PostRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
