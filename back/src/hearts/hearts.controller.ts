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
import { HeartsService } from './hearts.service';
@Controller('hearts')
export class HeartsController {
  constructor(private readonly heartsService: HeartsService) {}

  @Get(':postId') //좋아요 추가
  setHeart(@Param('postId', ParseIntPipe) postId: number) {
    return this.heartsService.setHeart(postId, 1);
  }

  @Delete(':postId') //좋아요 삭제
  deleteHeart(@Param('postId', ParseIntPipe) id: number) {
    return this.heartsService.deleteHeart();
  }

  @Get(':postId') // 좋아요 카운트
  getHeartCount(@Param('postId', ParseIntPipe) id: number) {
    return this.heartsService.getHeartCount();
  }

  @Get(':postId') // 좋아요한 유저 목록
  getAllLikedUser(@Param('postId', ParseIntPipe) id: number) {
    return this.heartsService.getAllLikedUser();
  }

  @Get(':userId/:postId')
  async findOne(
    @Param('userId') userId: string,
    @Param('postId') postId: string
  ) {
    return await this.heartsService.findOne(+userId, +postId);
  }
}
