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
    let baseSql = this.getBaseQuery();
    let tailSql = this.getTailQuery();

    const posts = await this.connection.query(baseSql + tailSql, [
      userId,
      habitatId,
      LIMIT_NUMBER,
    ]);

    console.log(posts.length);

    const lastPostId =
      posts.length === LIMIT_NUMBER
        ? posts[LIMIT_NUMBER - 1].post_id
        : null;

    if (lastPostId) return { posts, lastPostId };
    else return { posts };
  }

  async getNextPage(
    habitatId: number,
    userId: number,
    oldLastPostId: number
  ) {
    let baseSql = this.getBaseQuery();
    let tailSql = this.getTailQuery();
    let middleSql = `
    and p.post_id < ?
    `;

    const posts = await this.connection.query(
      baseSql + middleSql + tailSql,
      [userId, habitatId, oldLastPostId, LIMIT_NUMBER]
    );

    const currentLastPostId =
      posts.length === LIMIT_NUMBER
        ? posts[LIMIT_NUMBER - 1].post_id
        : null;

    if (currentLastPostId)
      return { posts, lastPostId: currentLastPostId };
    else return { posts };
  }

  private getBaseQuery() {
    return `
    select p.post_id, p.human_content, p.animal_content, p.created_at, u.user_id, u.username, u.nickname, c.url, group_concat(pcc.url) as urls, group_concat(pcc.mime_type) as types, if(h.post_id, p.post_id, null) as is_heart
    from post p
    left join user u on u.user_id = p.user_id
    left join contents c on c.contents_id = u.contents_id
    left join post_contents pc on pc.post_id = p.post_id
    left join contents pcc on pc.contents_id = pcc.contents_id
    left join heart h on h.post_id = p.post_id and h.user_id = ?
    where p.habitat_id = ? 
    `;
  }

  private getTailQuery() {
    return `
    group by p.post_id
    order by p.post_id desc 
    limit ? ;
    `;
  }

  async findAll(habitatId: number, lastPostId?: number) {
    if (!lastPostId) {
      return await this.getFirstPage(habitatId, 1);
    } else {
      return await this.getNextPage(habitatId, 1, lastPostId);
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
