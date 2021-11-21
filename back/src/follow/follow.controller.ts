import { Controller, Post, Param, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FollowService } from './follow.service';

@Controller('follow')
@ApiTags('좋아요 API')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('/:targetId')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '팔로잉,팔로우 API',
    description: '인증된 유저가 targetId에 해당하는 유저를 팔로우한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Param('targetId', ParseIntPipe) targetId: number, @Req() req) {
    return this.followService.create(targetId, req.user.userId);
  }

  // @Get()
  // findAll() {
  //   return this.followService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.followService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFollowDto: UpdateFollowDto) {
  //   return this.followService.update(+id, updateFollowDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.followService.remove(+id);
  // }
}
