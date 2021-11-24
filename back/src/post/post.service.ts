import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { Connection } from 'typeorm';
import { convertStringToNumber } from 'utils/value-converter.util';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostRequestDto } from './dto/patchPostRequestDto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

const LIMIT_NUMBER = 10;
const USER_ID = 12;

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private connection: Connection
  ) {}

  async create(createPostDto: CreatePostDto, contentsInfos: CreateContentDto[], userId: number) {
    return await this.postRepository.createPost(createPostDto, contentsInfos, userId);
  }

  async findAll(habitatId: number, lastPostId?: number) {
    if (!lastPostId) {
      const result = await this.getFirstPage(habitatId, USER_ID);
      result.posts.forEach((post) =>
        convertStringToNumber(post, 'numOfHearts', 'numOfComments', 'is_heart')
      );
      return result;
    } else {
      const result = await this.getNextPage(habitatId, USER_ID, lastPostId);
      result.posts.forEach((post) =>
        convertStringToNumber(post, 'numOfHearts', 'numOfComments', 'is_heart')
      );
      return result;
    }
  }

  async findAllByUserId(userId: number, lastId?: number): Promise<UserPostDto[]> {
    const results = await this.postRepository.findAllByUserId(userId, lastId);

    results.forEach((result: UserPostDto) =>
      convertStringToNumber(result, 'numOfHearts', 'numOfComments')
    );

    return results;
  }

  async getFirstPage(habitatId: number, userId: number) {
    let baseSql = this.getBaseQuery();
    let tailSql = this.getTailQuery();
    let whereSql = `where p.habitat_id = ? 
    `;

    const posts = await this.connection.query(baseSql + whereSql + tailSql, [
      userId,
      habitatId,
      LIMIT_NUMBER,
    ]);

    return { posts };
  }

  async getNextPage(habitatId: number, userId: number, oldLastPostId: number) {
    let baseSql = this.getBaseQuery();
    let tailSql = this.getTailQuery();
    let whereSql = `where p.habitat_id = ?
    `;
    let middleSql = `
    and p.post_id < ?
    `;

    const posts = await this.connection.query(baseSql + whereSql + middleSql + tailSql, [
      userId,
      habitatId,
      oldLastPostId,
      LIMIT_NUMBER,
    ]);

    return { posts };
  }

  private getBaseQuery() {
    return `
    select p.post_id, p.human_content, p.animal_content, p.created_at, u.user_id, u.username, u.nickname, c.url as user_image_url
    , group_concat(distinct pcc.url) as post_contents_urls, group_concat(distinct pcc.mime_type) as post_contents_types
    , (select count(*) from heart where post_id = p.post_id) as numOfHearts
    , (select count(*) from comment where post_id = p.post_id) as numOfComments
    , (select count(*) from heart where post_id = p.post_id and user_id = ?) as is_heart
    from post p
    inner join user u on u.user_id = p.user_id
    inner join contents c on c.contents_id = u.contents_id
    inner join post_contents pc on pc.post_id = p.post_id
    inner join contents pcc on pc.contents_id = pcc.contents_id
    `;
  }

  private getTailQuery() {
    return `
    group by p.post_id
    order by p.post_id desc 
    limit ? ;
    `;
  }

  async findOne(id: number) {
    let baseSql = this.getBaseQuery();
    let whereSql = `where p.post_id = ?;
    `;
    return (await this.connection.query(baseSql + whereSql, [USER_ID, id]))[0];
  }

  async update(
    id: number,
    patchPostRequestDto: PatchPostRequestDto,
    contentsInfos: CreateContentDto[]
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const postRepository = queryRunner.manager.getRepository(Post);
    const postContentRepository = queryRunner.manager.getRepository(PostContent);
    const contentRepository = queryRunner.manager.getRepository(Content);

    const post = await postRepository.findOne(id, {
      relations: ['postContents'],
    });

    const updateIds = JSON.parse(patchPostRequestDto.contentIds).map(
      (info: { id: string }, i: number) => info.id
    );

    const excludedPostContents = post.postContents.filter(
      (postContent, i) => !updateIds.includes('' + postContent.contentsId)
    );

    if (
      post.postContents.length - excludedPostContents.length + contentsInfos.length >
      LIMIT_NUMBER
    )
      return false;

    queryRunner.startTransaction();

    try {
      const excludedContentIds = excludedPostContents.map((postContent) => postContent.contentsId);
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
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const postRepository = queryRunner.manager.getRepository(Post);
    const postContentRepository = queryRunner.manager.getRepository(PostContent);
    const contentRepository = queryRunner.manager.getRepository(Content);
    const commentRepository = queryRunner.manager.getRepository(Comment);

    const post = await postRepository.findOne(id, {
      relations: ['postContents', 'comments'],
    });

    queryRunner.startTransaction();

    try {
      const contentsIds = post.postContents.map((postContent) => postContent.contentsId);

      await contentRepository.delete(contentsIds);

      if (post.comments.length) await commentRepository.remove(post.comments);

      await postRepository.delete(post.id);

      await queryRunner.commitTransaction();

      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
