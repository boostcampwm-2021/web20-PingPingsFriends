import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { Heart } from 'src/hearts/entities/heart.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

const LIMIT_NUMBER = 10;

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

  async getFirstPage(habitatId: number) {
    const queryBuilder = this.getPostWithHabitatQueryBuilder(habitatId);
    const posts = await queryBuilder.orderBy('post.id', 'DESC').take(LIMIT_NUMBER).getMany();
    const lastPostId = posts.length === LIMIT_NUMBER ? posts[LIMIT_NUMBER - 1].id : null;

    if (lastPostId) return { posts, lastPostId };
    else return { posts };
  }

  async getNextPage(habitatId: number, oldLastPostId: string) {
    const queryBuilder = this.getPostWithHabitatQueryBuilder(habitatId);
    const posts = await queryBuilder.andWhere('post.id < :lastPostId', { lastPostId: oldLastPostId }).orderBy('post.id', 'DESC').take(LIMIT_NUMBER).getMany();
    const currentLastPostId = posts.length === LIMIT_NUMBER ? posts[LIMIT_NUMBER - 1].id : null;

    if (currentLastPostId) return { posts, lastPostId: currentLastPostId };
    else return { posts };
  }

  private getPostWithHabitatQueryBuilder(habitatId: number) {
    return this.postRepository
      .createQueryBuilder('post')
      .addSelect((qb) => qb.select('true').from(Heart, 'heart').where('heart.userId = :userId', { userId: 1 }).andWhere('heart.postId = post.id'), 'post.isHeart')
      .innerJoinAndSelect('post.user', 'user')
      .select(['post.id', 'post.habitatId', 'post.humanContent', 'post.animalContent', 'post.createdAt', 'user.id', 'user.username', 'user.nickname'])
      .innerJoinAndSelect('user.content', 'content')
      .leftJoinAndSelect('post.postContents', 'postContents')
      .leftJoinAndSelect('postContents.content', 'postContent')
      .loadRelationCountAndMap('post.numOfHearts', 'post.likingUsers', 'user')
      .loadRelationCountAndMap('post.numOfComments', 'post.comments', 'comments')
      .where('post.habitatId = :habitatId ', { habitatId: habitatId });
  }

  async findAll(habitatId: number, lastPostId?: string) {
    if (!lastPostId) {
      return await this.getFirstPage(habitatId);
    } else {
      return await this.getNextPage(habitatId, lastPostId);
    }
  }

  findOne(id: number) {
    return this.postRepository.findOne(id, {
      relations: ['user', 'user.content', 'comments', 'comments.user', 'comments.user.content', 'postContents', 'postContents.content', 'hearts', 'hearts.user'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
