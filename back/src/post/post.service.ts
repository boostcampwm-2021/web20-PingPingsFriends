import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PAGE_LIMIT, UPLOAD_LIMIT } from 'common/constants/nums';
import { Comment } from 'src/comments/entities/comment.entity';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { Connection } from 'typeorm';
import { convertStringToNumber } from 'utils/value-converter.util';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostRequestDto } from './dto/patchPostRequestDto';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private userRepository: UserRepository,
    private connection: Connection
  ) {}

  async create(createPostDto: CreatePostDto, contentsInfos: CreateContentDto[], userId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['species'] });

    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    const animalContent = translateHumanToAnimal(user, createPostDto);

    return await this.postRepository.createPost(
      createPostDto,
      contentsInfos,
      userId,
      animalContent
    );
  }

  async findAll(habitatId: number, user: any, lastPostId?: number) {
    const userId = user ? user.userId : user;

    if (!lastPostId) {
      const result = await this.getFirstPage(habitatId, userId);

      result.posts.forEach((post) =>
        convertStringToNumber(post, 'numOfHearts', 'numOfComments', 'is_heart')
      );

      return result;
    } else {
      const result = await this.getNextPage(habitatId, userId, lastPostId);

      result.posts.forEach((post) =>
        convertStringToNumber(post, 'numOfHearts', 'numOfComments', 'is_heart')
      );

      return result;
    }
  }

  async findAllByUserId(userId: number, lastPostId?: number): Promise<UserPostDto[]> {
    const results = await this.postRepository.findAllByUserId(userId, lastPostId);

    results.forEach((result: UserPostDto) =>
      convertStringToNumber(result, 'numOfHearts', 'numOfComments')
    );

    return results;
  }

  async getFirstPage(habitatId: number, userId: number | false) {
    let baseSql = this.getBaseQuery();
    let tailSql = this.getTailQuery();
    let whereSql = `where p.habitat_id = ? 
    `;

    const posts = await this.connection.query(baseSql + whereSql + tailSql, [
      userId,
      habitatId,
      PAGE_LIMIT,
    ]);

    return { posts };
  }

  async getNextPage(habitatId: number, userId: number | false, lastPostId: number) {
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
      lastPostId,
      PAGE_LIMIT,
    ]);

    return { posts };
  }

  private getBaseQuery() {
    return `
    select p.post_id, p.human_content, p.animal_content, p.created_at, u.user_id, u.username, u.nickname, c.contents_id, c.url as user_image_url
    , group_concat(pcc.url order by pcc.contents_id) as post_contents_urls, group_concat(pcc.contents_id order by pcc.contents_id) as post_contents_ids
    , (select count(*) from heart where post_id = p.post_id) as numOfHearts
    , (select count(*) from comment where post_id = p.post_id) as numOfComments
    , (select count(*) from heart where post_id = p.post_id and user_id = ?) as is_heart
    from post p
    straight_join user u on u.user_id = p.user_id
    left join contents c on c.contents_id = u.contents_id
    straight_join post_contents pc on pc.post_id = p.post_id
    straight_join contents pcc on pc.contents_id = pcc.contents_id
    `;
  }

  private getTailQuery() {
    return `
    group by p.post_id
    order by p.post_id desc 
    limit ? ;
    `;
  }

  async findOne(posId: number, user: any) {
    const userId = user ? user.userId : user;
    let baseSql = this.getBaseQuery();
    let whereSql = `where p.post_id = ?;
    `;

    const result = (await this.connection.query(baseSql + whereSql, [userId, posId]))[0];

    if (!result) throw new HttpException('Error: 잘못된 접근입니다.', HttpStatus.BAD_REQUEST);

    convertStringToNumber(result, 'numOfHearts', 'numOfComments', 'is_heart');
    return result;
  }

  async update(
    postId: number,
    patchPostRequestDto: PatchPostRequestDto,
    contentsInfos: CreateContentDto[],
    userId: number
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const userRepository = queryRunner.manager.getRepository(User);
    const postRepository = queryRunner.manager.getRepository(Post);
    const postContentRepository = queryRunner.manager.getRepository(PostContent);
    const contentRepository = queryRunner.manager.getRepository(Content);

    const post = await postRepository.findOne(postId, {
      relations: ['postContents'],
    });

    const updateIds = patchPostRequestDto.contentIds.split(',').map((id: string) => id);

    const excludedPostContents = post.postContents.filter(
      (postContent) => !updateIds.includes('' + postContent.contentsId)
    );

    if (
      post.postContents.length - excludedPostContents.length + contentsInfos.length >
      UPLOAD_LIMIT
    )
      return false;

    const user = await userRepository.findOne(userId, { relations: ['species'] });

    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    const animalContent = translateHumanToAnimal(user, patchPostRequestDto);

    await queryRunner.startTransaction();

    try {
      const excludedContentIds = excludedPostContents.map((postContent) => postContent.contentsId);
      if (excludedContentIds.length) await contentRepository.delete(excludedContentIds);

      const contents = await contentRepository.save(contentsInfos);
      const postContents = contents.map((content) => ({
        postId: post.id,
        contentsId: content.id,
      }));
      await postContentRepository.insert(postContents);

      await postRepository.update(postId, {
        humanContent: patchPostRequestDto.humanContent,
        animalContent: animalContent,
      });

      await queryRunner.commitTransaction();

      return true;
    } catch (err) {
      console.log(err);
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

function translateHumanToAnimal(user: User, dto: CreatePostDto | PatchPostRequestDto) {
  const { sound } = user.species;
  const contentArr = [];
  const soundLength = sound.length;
  const humanContentLength = dto.humanContent.length;

  Array(Math.ceil(humanContentLength / (soundLength + 2)))
    .fill(0)
    .forEach((v) => {
      contentArr.push(sound + '!');
    });
  return contentArr.join(' ').slice(0, 501);
}
