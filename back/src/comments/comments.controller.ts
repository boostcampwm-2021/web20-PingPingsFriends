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
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentCursorPaginationDto } from './dto/comments-cursor-pagination.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
@ApiTags('댓글 API')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth('access-token')
  @Post() //댓글 추가
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '댓글 추가 API',
    description: '게시물에 댓글을 추가한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: '댓글 생성', type: Comment })
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.createComment(createCommentDto, req.user.userId);
  }

  @Patch(':commentId') //댓글 수정
  @ApiOperation({
    summary: '댓글 수정 API',
    description: '게시물 댓글을 수정한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req
  ) {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }

  @Delete(':commentId') //댓글 삭제
  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '게시물 댓글을 삭제한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('commentId', ParseIntPipe) commentId: number, @Req() req) {
    return this.commentsService.removeComment(commentId);
  }

  @Get('cursor') //댓글 커서 페이지네이션
  @ApiOperation({
    summary: '댓글 리스트 반환 cursor pagination API',
    description:
      '게시물(postId)의 특정 댓글(lastId)부터 특정 개수(limit)를 반환하는 API, 처음 요청시 lastId를 비우면 된다.',
  })
  getCommentList(@Query() query: CommentCursorPaginationDto) {
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
