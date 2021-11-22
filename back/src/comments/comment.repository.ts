import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  //db 접근로직
  async createComment(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const { post_id, content } = createCommentDto;
    const comment = new Comment();
    comment.postId = post_id;
    comment.userId = userId;
    comment.content = content;
    const result = await this.save(comment);
    return result;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<UpdateResult> {
    const { content } = updateCommentDto;
    const result = await this.update(id, { content });
    return result;
  }

  async removeComment(id: number): Promise<DeleteResult> {
    const result = await this.delete(id);
    return result;
  }

  async selectCommentListByCursor(lastId: number, postId: number, limit: number) {
    return await this.createQueryBuilder('comment')
      .innerJoin('comment.post', 'post')
      .innerJoin('comment.user', 'user')
      .leftJoin('user.content', 'content')
      .addSelect('user.nickname')
      .addSelect('content.url')
      .where('comment.id < :lastId', { lastId })
      .andWhere('comment.post.id = :postId', { postId })
      .orderBy('comment.id', 'DESC')
      .take(limit)
      .getMany();
  }

  async selectCommentListFirst(postId: number, limit: number) {
    return await this.createQueryBuilder('comment')
      .innerJoin('comment.post', 'post')
      .innerJoin('comment.user', 'user')
      .leftJoin('user.content', 'content')
      .addSelect('user.nickname')
      .addSelect('content.url')
      .andWhere('comment.post.id = :postId', { postId })
      .orderBy('comment.id', 'DESC')
      .take(limit)
      .getMany();
  }

  async findAll(postId: number) {
    return await this.createQueryBuilder('comment')
      .innerJoin('comment.post', 'post')
      .innerJoin('comment.user', 'user')
      .leftJoin('user.content', 'content')
      .addSelect('user.nickname')
      .addSelect('content.url')
      .where('comment.post.id = :postId', { postId })
      .getMany();
  }
}
