import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostContentsService } from './post-contents.service';
import { CreatePostContentDto } from './dto/create-post-content.dto';
import { UpdatePostContentDto } from './dto/update-post-content.dto';

@Controller('post-contents')
export class PostContentsController {
  constructor(private readonly postContentsService: PostContentsService) {}

  @Post()
  create(@Body() createPostContentDto: CreatePostContentDto) {
    return this.postContentsService.create(createPostContentDto);
  }

  @Get()
  findAll() {
    return this.postContentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postContentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostContentDto: UpdatePostContentDto) {
    return this.postContentsService.update(+id, updatePostContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postContentsService.remove(+id);
  }
}
