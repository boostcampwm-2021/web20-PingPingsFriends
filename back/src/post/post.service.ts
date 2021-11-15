import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';

const LIMIT_NUMBER = 10;

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository // @InjectRepository(PostContent) // private postContentRepository: Repository<PostContent>
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

  // async update(
  //   id: number,
  //   patchPostRequestDto: PatchPostRequestDto,
  //   contentsInfos: CreateContentDto[]
  // ) {
  //   const post = await this.postRepository.findOne(id, {
  //     relations: ['postContents'],
  //   });
  //   const updateIds = JSON.parse(
  //     patchPostRequestDto.contentInfos
  //   ).map((info: Content, i: number) => info.id);
  //   const excludedPost = post.postContents.filter(
  //     (postContent, i) =>
  //       !updateIds.includes('' + postContent.contentsId)
  //   );

  //   if (
  //     post.postContents.length -
  //       excludedPost.length +
  //       contentsInfos.length >
  //     10
  //   )
  //     return false;

  //   this.postContentRepository.remove(excludedPost);

  //   const newContents = contentsInfos.map((contentsInfo, i) => {
  //     return this.contentRepository.create(contentsInfo);
  //   });
  //   const newContentsEntities = await this.contentRepository.save(
  //     newContents
  //   );

  //   newContentsEntities.forEach((newContentsEntity, i) => {
  //     const newPostContent = this.postContentRepository.create({
  //       postId: post.id,
  //       contentsId: newContentsEntity.id,
  //     });
  //     this.postContentRepository.save(newPostContent);
  //   });

  //   this.postRepository.update(id, {
  //     humanContent: patchPostRequestDto.humanContent,
  //     animalContent: patchPostRequestDto.animalContent,
  //   });

  //   return true;
  // }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
