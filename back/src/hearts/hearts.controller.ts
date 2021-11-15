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
import { HeartsService } from './hearts.service';
@Controller('hearts')
export class HeartsController {
  constructor(private readonly heartsService: HeartsService) {}

  @Post(':postId') //좋아요 추가
  setHeart(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.setHeart(postId, 2);
  }

  @Delete(':postId') //좋아요 삭제
  deleteHeart(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.deleteHeart(postId, 1);
  }

  @Get('count/:postId') // 좋아요 카운트
  getHeartCount(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.getHeartCount(postId);
  }

  @Get(':postId') // 좋아요한 유저 목록
  getAllLikedUser(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() query
  ) {
    return this.heartsService.getAllLikedUser(
      postId,
      query.skip,
      query.take
    );
  }

  @Get(':userId/:postId')
  async findOne(
    @Param('userId') userId: string,
    @Param('postId') postId: string
  ) {
    return await this.heartsService.findOne(+userId, +postId);
  }
}
