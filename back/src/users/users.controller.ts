import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
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
import { Response } from 'express';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @ApiOperation({
    summary: '유저 리스트 조회',
    description: '모든 유저를 조회하는 api입니다.',
  })
  @ApiCreatedResponse({
    description: '성공',
    type: [userResponseDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({
    summary: '유저 정보 조회',
    description: '유저의 정보를 조회하는 api입니다.',
  })
  async findOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.findUserInfo(userId);
  }

  @Post('register')
  @ApiOperation({
    summary: '회원 가입',
    description: '회원 가입하는 api입니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: RegisterUserDto })
  @UseInterceptors(FileInterceptor('upload', multerUserOption))
  register(@Body(ParseUsernamePipe) createUserDto: CreateUserDto, @UploadedFile() image?: FileDto) {
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
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log(req.cookies);
    const { accessToken, refreshToken, refreshTokenExpireAt } = await this.authService.login(
      req.user
    );
    const user = await this.usersService.createRefreshToken(
      req.user.id,
      refreshToken,
      refreshTokenExpireAt
    );
    res.cookie('refreshToken', refreshToken);
    console.log(res.getHeaders());
    return { accessToken, user, refreshToken };
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
  updateImage(@UploadedFile() image: FileDto, @Req() req: any) {
    return this.usersService.updateImage(image, req.user);
  }

  @Get('auth/refresh')
  @ApiOperation({
    summary: '유저 액세스 토큰 재발급',
    description: '유저의 액세스 토큰을 재발급하는 api입니다.',
  })
  @ApiCookieAuth()
  async refresh(@Req() req) {
    const refreshToken = req.cookies['refreshToken'];
    const accessToken = await this.authService.refreshAccessToken(refreshToken);
    return { accessToken };
  }
}
