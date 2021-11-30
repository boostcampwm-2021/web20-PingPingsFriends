import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentCursorPaginationDto } from './dto/comments-cursor-pagination.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository
  ) {}

  createComment(createCommentDto: CreateCommentDto, userId: number) {
    return this.commentRepository.createComment(createCommentDto, userId);
  }

  async updateComment(postId: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne(postId);
    if (comment.userId !== userId)
      throw new HttpException('Error: 잘못된 사용자 접근입니다.', HttpStatus.FORBIDDEN);

    return this.commentRepository.updateComment(postId, updateCommentDto);
  }

  async removeComment(postId: number, userId: number) {
    const comment = await this.commentRepository.findOne(postId);
    if (comment.userId !== userId)
      throw new HttpException('Error: 잘못된 사용자 접근입니다.', HttpStatus.FORBIDDEN);
    return this.commentRepository.removeComment(postId);
  }

  getCommentList(query: CommentCursorPaginationDto) {
    const { postId, limit } = query;
    return query.lastId === undefined
      ? this.commentRepository.selectCommentListFirst(postId, limit)
      : this.commentRepository.selectCommentListByCursor(query.lastId, postId, limit);
  }

  getCommentAll(postId: number) {
    return this.commentRepository.findAll(postId);
  }
}
