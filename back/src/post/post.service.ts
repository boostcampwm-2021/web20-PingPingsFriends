import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Connection } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostRequestDto } from './dto/patchPostRequestDto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

const LIMIT_NUMBER = 10;

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private connection: Connection
  ) {}

  async create(
    createPostDto: CreatePostDto,
    contentsInfos: CreateContentDto[]
  ) {
    return await this.postRepository.createPost(
      createPostDto,
      contentsInfos
    );
  }

  async getFirstPage(habitatId: number, userId: number) {
    const queryBuilder = this.getPostWithHabitatQueryBuilder(
      habitatId,
      userId
    );
    const posts = await queryBuilder
      .orderBy('post.id', 'DESC')
      .take(LIMIT_NUMBER)
      .getMany();
    const lastPostId =
      posts.length === LIMIT_NUMBER
        ? posts[LIMIT_NUMBER - 1].id
        : null;

    if (lastPostId) return { posts, lastPostId };
    else return { posts };
  }

  async getNextPage(
    habitatId: number,
    userId: number,
    oldLastPostId: number
  ) {
    const queryBuilder = this.getPostWithHabitatQueryBuilder(
      habitatId,
      userId
    );
    const posts = await queryBuilder
      .andWhere('post.id < :lastPostId', {
        lastPostId: oldLastPostId,
      })
      .orderBy('post.id', 'DESC')
      .take(LIMIT_NUMBER)
      .getMany();
    const currentLastPostId =
      posts.length === LIMIT_NUMBER
        ? posts[LIMIT_NUMBER - 1].id
        : null;

    if (currentLastPostId)
      return { posts, lastPostId: currentLastPostId };
    else return { posts };
  }

  private getPostWithHabitatQueryBuilder(
    habitatId: number,
    userId: number
  ) {
    return this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.habitatId',
        'post.humanContent',
        'post.animalContent',
        'post.createdAt',
        'user.id',
        'user.username',
        'user.nickname',
      ])
      .innerJoinAndSelect('user.content', 'content')
      .leftJoinAndSelect('post.postContents', 'postContents')
      .leftJoinAndSelect('postContents.content', 'postContent')
      .leftJoinAndSelect(
        'post.hearts',
        'heart',
        'heart.userId = :userId',
        { userId: userId }
      )
      .loadRelationCountAndMap(
        'post.numOfHearts',
        'post.likingUsers',
        'user'
      )
      .loadRelationCountAndMap(
        'post.numOfComments',
        'post.comments',
        'comments'
      )
      .where('post.habitatId = :habitatId ', {
        habitatId: habitatId,
      });
  }

  async findAll(
    habitatId: number,
    userId: number,
    lastPostId?: number
  ) {
    if (!lastPostId) {
      return await this.getFirstPage(habitatId, userId);
    } else {
      return await this.getNextPage(habitatId, userId, lastPostId);
    }
  }

  findOne(id: number) {
    return this.postRepository.findOne(id, {
      relations: [
        'user',
        'user.content',
        'comments',
        'comments.user',
        'comments.user.content',
        'postContents',
        'postContents.content',
        'hearts',
        'hearts.user',
      ],
    });
  }

  async update(
    id: number,
    patchPostRequestDto: PatchPostRequestDto,
    contentsInfos: CreateContentDto[]
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const postRepository = queryRunner.manager.getRepository(Post);
    const postContentRepository =
      queryRunner.manager.getRepository(PostContent);
    const contentRepository =
      queryRunner.manager.getRepository(Content);

    const post = await postRepository.findOne(id, {
      relations: ['postContents'],
    });

    const updateIds = JSON.parse(patchPostRequestDto.contentIds).map(
      (info: { id: string }, i: number) => info.id
    );

    const excludedPostContents = post.postContents.filter(
      (postContent, i) =>
        !updateIds.includes('' + postContent.contentsId)
    );

    if (
      post.postContents.length -
        excludedPostContents.length +
        contentsInfos.length >
      10
    )
      return false;

    queryRunner.startTransaction();

    try {
      const excludedContentIds = excludedPostContents.map(
        (postContent) => postContent.contentsId
      );
      await contentRepository.delete(excludedContentIds);

      const contents = await contentRepository.save(contentsInfos);
      const postContents = contents.map((content) => ({
        postId: post.id,
        contentsId: content.id,
      }));
      postContentRepository.insert(postContents);

      await postRepository.update(id, {
        humanContent: patchPostRequestDto.humanContent,
        animalContent: patchPostRequestDto.animalContent,
      });

      await queryRunner.commitTransaction();

      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
