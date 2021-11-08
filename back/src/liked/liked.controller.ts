import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikedService } from './liked.service';
import { CreateLikedDto } from './dto/create-liked.dto';
import { UpdateLikedDto } from './dto/update-liked.dto';

@Controller('liked')
export class LikedController {
  constructor(private readonly likedService: LikedService) {}

  @Post()
  create(@Body() createLikedDto: CreateLikedDto) {
    return this.likedService.create(createLikedDto);
  }

  @Get()
  findAll() {
    return this.likedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikedDto: UpdateLikedDto) {
    return this.likedService.update(+id, updateLikedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedService.remove(+id);
  }
}
