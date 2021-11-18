import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto, contentsInfos: CreateContentDto[]): Promise<Post> {
    const post = new Post();
    post.animalContent = createPostDto.animalContent;
    post.humanContent = createPostDto.humanContent;
    post.userId = createPostDto.userId;
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

  async selectTopPostUserInfo(take: number) {
    return this.query(
      `SELECT p.created_at as createdAt ,u.nickname as nickName ,c.url FROM post p 
    JOIN user u ON u.user_id = p.user_id
    LEFT JOIN contents c ON c.contents_id = u.contents_id
    WHERE p.habitat_id = ?
    ORDER BY p.created_at desc
    LIMIT 3`,
      [3]
    );
  }
}
