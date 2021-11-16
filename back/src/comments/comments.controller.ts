import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
@ApiTags('댓글 API')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post() //댓글 추가
  @ApiOperation({
    summary: '댓글 추가 API',
    description: '게시물에 댓글을 추가한다.',
  })
  @ApiCreatedResponse({ description: '댓글 생성', type: Comment })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Patch(':id') //댓글 수정
  @ApiOperation({
    summary: '댓글 수정 API',
    description: '게시물 댓글을 수정한다.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id') //댓글 삭제
  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '게시물 댓글을 삭제한다.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.removeComment(id);
  }
}
