import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeartsService } from './hearts.service';
import { CreateHeartDto } from './dto/create-heart.dto';
import { UpdateHeartDto } from './dto/update-heart.dto';

@Controller('hearts')
export class HeartsController {
  constructor(private readonly heartsService: HeartsService) {}

  @Post()
  create(@Body() createHeartDto: CreateHeartDto) {
    return this.heartsService.create(createHeartDto);
  }

  @Get()
  findAll() {
    return this.heartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeartDto: UpdateHeartDto) {
    return this.heartsService.update(+id, updateHeartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heartsService.remove(+id);
  }
}
