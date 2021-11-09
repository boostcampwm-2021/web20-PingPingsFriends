import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll(habitatId: number, skip: number, take: number) {
    return this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .innerJoinAndSelect('user.content', 'content')
      .loadRelationCountAndMap('post.numOfLikes', 'post.likingUser', 'user')
      .loadRelationCountAndMap('post.numOfComments', 'post.comments', 'comments')
      .where('post.habitatId = :habitatId ', { habitatId: habitatId })
      .orderBy('post.id', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
  }

  findOne(id: number) {
    return this.postRepository.findOne(id, { relations: ['user', 'user.content', 'comments', 'comments.user', 'comments.user.content', 'postContents', 'postContents.content', 'likingUser'] });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
