import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { multerOption, S3Service } from 'src/s3/s3.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PatchPostRequestDto } from './dto/patchPostRequestDto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly s3Servise: S3Service) {}

  @Post()
  @UseInterceptors(FilesInterceptor('upload', 10, multerOption))
  async uploadFile(@Body() createPostDto: CreatePostDto, @UploadedFiles() files: Express.Multer.File[]) {
    const contentsInfos = this.s3Servise.getPartialFilesInfo(files);
    return await this.postService.create(createPostDto, contentsInfos);
  }

  @Get(':habitatId')
  async findAll(@Param('habitatId') habitatId: string, @Query('userId') userId: string, @Query('lastPostId') lastPostId?: string) {
    return await this.postService.findAll(+habitatId, +userId, +lastPostId);
  }

  @Get(':habitatId/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('upload', 10, multerOption))
  update(@Param('id') id: string, @Body() patchPostRequestDto: PatchPostRequestDto, @UploadedFiles() files: Express.Multer.File[]) {
    const contentsInfos = this.s3Servise.getPartialFilesInfo(files);
    return this.postService.update(+id, patchPostRequestDto, contentsInfos);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
