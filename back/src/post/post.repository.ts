import { Comment } from 'src/comments/entities/comment.entity';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { Heart } from 'src/hearts/entities/heart.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

const USER_PAGE_LIMIT = 12;

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(
    createPostDto: CreatePostDto,
    contentsInfos: CreateContentDto[],
    userId: number,
    animalContent: string
  ): Promise<Post> {
    const post = new Post();
    post.animalContent = animalContent;
    post.humanContent = createPostDto.humanContent;
    post.userId = userId;
    post.habitatId = createPostDto.habitatId;

    const postContents = contentsInfos.map((contentsInfo, i) => {
      const content = new Content();
      content.url = contentsInfo.url;
      content.mimeType = contentsInfo.mimeType;
      const postContent = new PostContent();
      postContent.content = content;
      return postContent;
    });
    post.postContents = postContents;

    return await this.save(post);
  }

  async selectTopPostUserInfo(take: number, habitatId: number) {
    return this.query(
      `SELECT p.created_at as createdAt ,u.nickname as nickName ,c.url FROM post p 
    JOIN user u ON u.user_id = p.user_id
    LEFT JOIN contents c ON c.contents_id = u.contents_id
    WHERE p.habitat_id = ?
    ORDER BY p.post_id desc
    LIMIT 3`,
      [habitatId]
    );
  }

  async findAllByUserId(userId: number, lastId?: number): Promise<UserPostDto[]> {
    const queryBuilder = this.createQueryBuilder('post')
      .select('post.id', 'postId')
      .innerJoin('post.postContents', 'postContents')
      .innerJoin('postContents.content', 'content')
      .addSelect('min(content.url)', 'url')
      .addSelect(
        (qb) => qb.select('count(*)').from(Heart, 'heart').where('heart.postId = post.id'),
        'numOfHearts'
      )
      .addSelect(
        (qb) => qb.select('count(*)').from(Comment, 'comment').where('comment.postId = post.id'),
        'numOfComments'
      )
      .where('post.userId = :userId', { userId });

    if (lastId) queryBuilder.andWhere('post.id < :postId', { postId: lastId });

    return await queryBuilder
      .groupBy('post.id')
      .orderBy('post.id', 'DESC')
      .limit(USER_PAGE_LIMIT)
      .getRawMany();
  }
}
