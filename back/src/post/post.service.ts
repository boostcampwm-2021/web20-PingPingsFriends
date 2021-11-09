import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/contents/entities/content.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

interface contentDto {
  location: string;
  mimetype: string;
}

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

  create(createPostDto: CreatePostDto, contentsInfos: contentDto[]) {
    const newPost = this.postRepository.create(createPostDto);
    const newContents = contentsInfos.map((contentsInfo, i) => {
      return this.contentRepository.create({
        url: contentsInfo.location,
        mimeType: contentsInfo.mimetype,
      });
    });
    newContents.forEach((newContent, i) => {
      this.postContentRepository.create({
        postId: newPost.id,
        contentsId: newContent.id,
      });
    });
    return newPost;
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
