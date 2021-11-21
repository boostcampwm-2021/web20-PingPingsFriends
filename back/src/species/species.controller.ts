import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('species')
@ApiTags('동물카테고리 API')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @ApiOperation({
    summary: '동물 카테고리 추가 API',
    description: '동물 카테고리 추가하기',
  })
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @ApiOperation({
    summary: '동물 카테고리 조회 API',
    description: '동물 카테고리 조회하기',
  })
  findAll() {
    return this.speciesService.findAll();
  }
}
