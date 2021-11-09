import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository){}

  createComment(createCommentDto: CreateCommentDto) {
    return this.commentRepository.createComment(createCommentDto);
  }

  updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.updateComment(id, updateCommentDto);
  }

  removeComment(id: number) {
    return this.commentRepository.removeComment(id);

  }
}
