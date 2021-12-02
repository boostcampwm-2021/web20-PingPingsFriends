import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { userResponseDto } from './dto/userResponseDto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { multerUserOption } from 'config/s3.config';
import { ParseUsernamePipe } from 'common/pipes/validation-sign-up.pipe';
import FileDto from 'common/dto/transformFileDto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { FileUploadDto } from 'common/dto/file-upload.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtRefreshAuthGuard } from 'src/auth/jwt-refresh-auth.guard';
import { Response } from 'express';
import { getPartialFileInfo } from 'utils/s3.util';
import { ParseOptionalStringPipe } from 'common/pipes/parse-optional-string.pipe';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get('verification')
  @ApiOperation({
    summary: '회원 가입 중복 검사',
    description: '회원 가입 중복 검사 api입니다.',
  })
  @ApiQuery({ name: 'username', required: false, type: 'string' })
  @ApiQuery({ name: 'nickname', required: false, type: 'string' })
  @HttpCode(200)
  async check(@Query('username') username?: string, @Query('nickname') nickname?: string) {
    return await this.usersService.check(username, nickname);
  }

  @Get('info')
  @ApiOperation({
    summary: '헤더 유저 정보 조회',
    description: '헤더에 표시될 유저의 정보를 조회하는 api입니다.',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async findOne(@Req() req) {
    return await this.usersService.findOne(req.user.userId);
  }

  @Get(':userId')
  @ApiOperation({
    summary: '유저 정보 조회',
    description: '유저 페이지에 표시될 유저의 정보를 조회하는 api입니다.',
  })
  @HttpCode(200)
  async findUserInfo(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.findUserInfo(userId);
  }

  @Get()
  @ApiOperation({
    summary: '유저 리스트 조회',
    description: '모든 유저를 조회하는 api입니다.',
  })
  @ApiCreatedResponse({
    description: '성공',
    type: [userResponseDto],
  })
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  }

  @Post('register')
  @ApiOperation({
    summary: '회원 가입',
    description: '회원 가입하는 api입니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: RegisterUserDto })
  @UseInterceptors(FileInterceptor('upload', multerUserOption))
  @HttpCode(201)
  register(@Body(ParseUsernamePipe) createUserDto: CreateUserDto, @UploadedFile() image: FileDto) {
    return this.usersService.create(createUserDto, image);
  }

  @Post('login')
  @ApiOperation({
    summary: '유저 로그인',
    description: '유저가 로그인하는 api입니다.',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiCreatedResponse({
    description: '성공',
    type: User,
  })
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(req.user);
    const user = await this.usersService.createRefreshToken(req.user.id, refreshToken);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', path: '/api/' });
    return { accessToken, user };
  }

  @Delete('logout')
  @ApiOperation({
    summary: '유저 로그아웃',
    description: '유저가 로그아웃하는 api입니다.',
  })
  @ApiCookieAuth()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log(req.cookies);
    const refreshToken = req.cookies['refreshToken'];
    await this.usersService.logout(req.user.userId, refreshToken);
    res.clearCookie('refreshToken');
    return { result: 'true' };
  }

  @Patch('contents')
  @ApiOperation({
    summary: '유저 프로필 사진 변경',
    description: '유저 프로필 사진을 변경하는 api입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('upload', multerUserOption))
  @HttpCode(200)
  updateImage(@UploadedFile() image: FileDto, @Req() req: any) {
    const contentInfo = getPartialFileInfo(image);
    return this.usersService.updateImage(contentInfo, req.user.userId);
  }

  @Get('auth/refresh')
  @ApiOperation({
    summary: '유저 액세스 토큰 재발급',
    description: '유저의 액세스 토큰을 재발급하는 api입니다.',
  })
  @ApiCookieAuth()
  @HttpCode(200)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Req() req) {
    const refreshToken = req.cookies['refreshToken'];
    const accessToken = await this.authService.refreshAccessToken(refreshToken);
    return { accessToken };
  }
}
