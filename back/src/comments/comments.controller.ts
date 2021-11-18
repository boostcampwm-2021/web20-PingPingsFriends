import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CursorPaginationDto } from './dto/cursor-pagination.dto';
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
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req
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

  @Get('cursor') //댓글 커서 페이지네이션
  @ApiOperation({
    summary: '댓글 리스트 반환 cursor pagination API',
    description:
      '게시물(postId)의 특정 댓글(lastId)부터 특정 개수(limit)를 반환하는 API, 처음 요청시 lastId를 비우면 된다.',
  })
  getCommentList(@Query() query: CursorPaginationDto) {
    return this.commentsService.getCommentList(query);
  }

  @Get('all/:postId') //댓글 전체반환
  @ApiOperation({
    summary: '댓글 리스트 반환 All API',
    description: '게시물(postId)의 모든 댓글반환',
  })
  getCommentAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getCommentAll(postId);
  }
}
