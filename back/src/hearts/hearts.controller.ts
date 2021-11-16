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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { HeartsService } from './hearts.service';
@Controller('hearts')
@ApiTags('좋아요 API')
export class HeartsController {
  constructor(private readonly heartsService: HeartsService) {}

  @Post(':postId') //좋아요 추가
  @ApiOperation({
    summary: '좋아요 추가 API',
    description: '게시글 좋아요 누르기',
  })
  setHeart(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.setHeart(postId, 2);
  }

  @Delete(':postId') //좋아요 삭제
  @ApiOperation({
    summary: '좋아요 취소 API',
    description: '게시글 좋아요 취소',
  })
  deleteHeart(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.deleteHeart(postId, 1);
  }

  @Get('count/:postId') // 좋아요 카운트
  @ApiOperation({
    summary: '좋아요 카운트 API',
    description: '게시글 좋아요 개수 리턴',
  })
  getHeartCount(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.getHeartCount(postId);
  }

  @Get(':postId') // 좋아요한 유저 목록
  @ApiOperation({
    summary: '좋아요 누른 유저목록 API',
    description: '게시글 좋아요 누른 유저목록 반환',
  })
  getAllLikedUser(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() paginationQueryDto: PaginationQueryDto
  ) {
    return this.heartsService.getAllLikedUser(
      postId,
      paginationQueryDto
    );
  }

  // @Get(':userId/:postId')
  // async findOne(
  //   @Param('userId') userId: string,
  //   @Param('postId') postId: string
  // ) {
  //   return await this.heartsService.findOne(+userId, +postId);
  // }
}
