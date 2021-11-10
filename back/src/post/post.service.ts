import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(PostContent)
    private postContentRepository: Repository<PostContent>
  ) {}

  async create(createPostDto: CreatePostDto, contentsInfos: CreateContentDto[]) {
    const newPost = this.postRepository.create(createPostDto);
    const newPostEntity = await this.postRepository.save(newPost);

    const newContents = contentsInfos.map((contentsInfo, i) => {
      return this.contentRepository.create(contentsInfo);
    });
    const newContentsEntities = await this.contentRepository.save(newContents);

    newContentsEntities.forEach((newContentsEntity, i) => {
      const newPostContent = this.postContentRepository.create({
        postId: newPostEntity.id,
        contentsId: newContentsEntity.id,
      });
      this.postContentRepository.save(newPostContent);
    });
    return newPostEntity;
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
