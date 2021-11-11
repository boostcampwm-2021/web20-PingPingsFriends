import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikedsService } from './likeds.service';
import { CreateLikedDto } from './dto/create-liked.dto';
import { UpdateLikedDto } from './dto/update-liked.dto';

@Controller('likeds')
export class LikedsController {
  constructor(private readonly likedsService: LikedsService) {}

  @Post()
  create(@Body() createLikedDto: CreateLikedDto) {
    return this.likedsService.create(createLikedDto);
  }

  @Get()
  findAll() {
    return this.likedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likedsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikedDto: UpdateLikedDto) {
    return this.likedsService.update(+id, updateLikedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedsService.remove(+id);
  }
}
