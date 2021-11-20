import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
