import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CursorPaginationDto } from 'common/dto/cursor-pagination.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('species')
@ApiTags('동물카테고리 API')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @ApiOperation({
    summary: '동물 카테고리 추가 API',
    description: '동물 카테고리 추가하기',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }
  @Get('isDuplicated')
  @ApiOperation({
    summary: '동물 카테고리 이름 중복 체크 API',
    description: '동물 카테고리 이름 중복 여부 반환',
  })
  isDuplicate(@Query('name') name: string) {
    return this.speciesService.isDuplicate(name);
  }

  @Get('cursor') //동물 카테고리 커서 페이지네이션
  @ApiOperation({
    summary: '동물 카테고리 리스트 반환 cursor pagination API',
    description:
      '동물 카테고리(lastId)부터 특정 개수(limit)를 반환하는 API, 처음 요청시 lastId를 비우면 된다.',
  })
  getCommentList(@Query() query: CursorPaginationDto) {
    return this.speciesService.getSpeciestList(query);
  }
}
