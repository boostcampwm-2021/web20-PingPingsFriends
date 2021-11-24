import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';

@Controller('habitat')
@ApiTags('서식지 API')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  @Get('random')
  @ApiOperation({
    summary: '서식지 랜덤 pk 반환 API',
    description: '랜덤으로 서식지 pk값을 반환',
  })
  @ApiCreatedResponse({ description: '랜덤서식지10개 배열반환.' })
  getRandomHabitat(@Query('currentId', ParseIntPipe) currentId: number) {
    return this.habitatService.getRandomHabitat(currentId);
  }

  @Get('isDuplicated')
  @ApiOperation({
    summary: '서식지 이름 중복 체크 API',
    description: '서식지 이름 중복 여부 반환',
  })
  isDuplicate(@Query('name') name: string) {
    return this.habitatService.isDuplicate(name);
  }

  @Post()
  @ApiOperation({
    summary: '서식지 추가 API',
    description: '유저가 서식지를 추가한다.',
  })
  createHabitat(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatService.createHabitat(createHabitatDto, 3);
  }

  @Get()
  @ApiOperation({
    summary: '서식지 리스트 반환 API',
    description: '서식지 종류 리스트를 등록유저가 많은 순으로 반환',
  })
  getHabitatList(@Query() query: PaginationQueryDto) {
    return this.habitatService.getHabitatList(query);
  }

  @Get(':habitatId')
  @ApiOperation({
    summary: '서식지 정보 반환 API',
    description: '서식지 id로 서식지 정보 반환',
  })
  getHabitatInfo(@Param('habitatId', ParseIntPipe) habitatId: number) {
    return this.habitatService.getHabitatInfo(habitatId);
  }
}
