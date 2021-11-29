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
  ParseIntPipe,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { getPartialFilesInfo } from 'utils/s3.util';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PatchPostRequestDto } from './dto/patchPostRequestDto';
import { multerTransFormOption } from 'config/s3.config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetPostResponseDto } from './dto/getPostResponse.dto';
import { ParseOptionalIntPipe } from 'common/pipes/parse-optional-int.pipe';
import FileDto from 'common/dto/transformFileDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';
import { UPLOAD_LIMIT } from 'common/constants/nums';
// import { UPLOAD_LIMIT } from 'common/constants/nums';

@ApiTags('게시물 API')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 작성',
    description: '게시글을 작성하는 api입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePostDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('upload', UPLOAD_LIMIT, multerTransFormOption))
  @HttpCode(201)
  async uploadFile(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: FileDto[],
    @Req() req
  ) {
    const contentsInfos = getPartialFilesInfo(files);
    return await this.postService.create(createPostDto, contentsInfos, req.user.userId);
  }

  @Get('habitats/:habitatId')
  @ApiOperation({
    summary: '게시글 리스트 조회',
    description: '페이지 별 게시글 리스트를 조회하는 api입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: 'lastPostId', type: 'number', required: false })
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(200)
  async findAll(
    @Param('habitatId', ParseIntPipe) habitatId: number,
    @Req() req,
    @Query('lastPostId', ParseOptionalIntPipe) lastPostId?: number
  ) {
    return await this.postService.findAll(habitatId, req.user, lastPostId);
  }

  @Get('users/:userId')
  @ApiOperation({
    summary: '유저 게시글 리스트 조회',
    description: '특정 유저의 게시글 리스트를 조회하는 api입니다.',
  })
  @ApiQuery({ name: 'lastId', required: false })
  @HttpCode(200)
  async findAllByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('lastId', ParseOptionalIntPipe) lastId?: number
  ) {
    return await this.postService.findAllByUserId(userId, lastId);
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 게시글 조회',
    description: '특정 게시글을 조회하는 api입니다.',
  })
  @ApiCreatedResponse({ type: GetPostResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.postService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글을 수정하는 api입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PatchPostRequestDto })
  @ApiCreatedResponse({ type: Boolean })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('upload', UPLOAD_LIMIT, multerTransFormOption))
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostRequestDto: PatchPostRequestDto,
    @UploadedFiles() files: FileDto[]
  ) {
    const contentsInfos = getPartialFilesInfo(files);
    return await this.postService.update(id, patchPostRequestDto, contentsInfos);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시물 삭제',
    description: '게시물을 삭제하는 api입니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: Boolean })
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
