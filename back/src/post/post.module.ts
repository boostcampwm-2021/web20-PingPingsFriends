import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Content } from 'src/contents/entities/content.entity';
import { Heart } from 'src/hearts/entities/heart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostContent, Content, Heart]), S3Module],
  controllers: [PostController],
  providers: [PostService, S3Service],
})
export class PostModule {}
