import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { S3Service } from 'src/s3/s3.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly s3Servise: S3Service) {}

  @Post()
  async create(@Req() req: Request, @Res() res: Response, @Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    const contentsInfos = (await this.s3Servise.uploadS3(req, res)) as any[];
    return this.postService.create(createPostDto, contentsInfos);
  }

  @Get(':habitatId')
  findAll(@Param('habitatId') habitatId: string, @Query('skip') skip: string, @Query('take') take: string) {
    return this.postService.findAll(+habitatId, +skip, +take);
  }

  @Get(':habitatId/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
