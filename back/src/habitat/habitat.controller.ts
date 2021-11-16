import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('habitat')
@ApiTags('서식지 API')
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  @Post()
  @ApiOperation({
    summary: '서식지 추가 API',
    description: '유저가 서식지를 추가한다.',
  })
  createHabitat(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatService.createHabitat(createHabitatDto, 1);
  }

  @Get()
  getHabitatList(@Query() query) {
    return this.habitatService.getHabitatList(query.skip, query.take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitatDto: UpdateHabitatDto
  ) {
    return this.habitatService.update(+id, updateHabitatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatService.remove(+id);
  }
}
