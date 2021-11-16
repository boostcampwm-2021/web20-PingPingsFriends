import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { getPartialFilesInfo } from 'utils/s3.util';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PatchPostRequestDto } from './dto/patchPostRequestDto';
import multerOption from 'config/s3.config';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('upload', 10, multerOption))
  async uploadFile(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const contentsInfos = getPartialFilesInfo(files);
    return await this.postService.create(
      createPostDto,
      contentsInfos
    );
  }

  @Get(':habitatId')
  async findAll(
    @Param('habitatId') habitatId: string,
    @Query('lastPostId') lastPostId?: string
  ) {
    return await this.postService.findAll(+habitatId, +lastPostId);
  }

  @Get(':habitatId/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('upload', 10, multerOption))
  async update(
    @Param('id') id: string,
    @Body() patchPostRequestDto: PatchPostRequestDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const contentsInfos = getPartialFilesInfo(files);
    return await this.postService.update(
      +id,
      patchPostRequestDto,
      contentsInfos
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
