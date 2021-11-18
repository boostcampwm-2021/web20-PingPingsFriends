import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags, ApiOperation, ApiCreatedResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @ApiOperation({
    summary: '유저 조회',
    description: '모든 유저를 조회하는 api입니다.',
  })
  @ApiCreatedResponse({
    description: '성공',
    type: [userResponseDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBody({
    type: RegisterUserDto,
  })
  @ApiConsumes('multipart/form-data')
  @Post('register')
  @UseInterceptors(FileInterceptor('upload', multerUserOption))
  register(@Body(ParseUsernamePipe) createUserDto: CreateUserDto, @UploadedFile() image: FileDto) {
    return this.usersService.create(createUserDto, image);
  }

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
  @Post('login')
  async login(@Request() req) {
    console.log(req.user.id);
    const { accessToken } = await this.authService.login(req.user);
    const user = await this.usersService.findUser(req.user.id);

    return { accessToken, user };
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '사진과 ',
  })
  @Patch('contents')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('upload', multerUserOption))
  updateImage(@UploadedFile() image: FileDto, @Req() req: any) {
    return this.usersService.updateImage(image, req.user);
  }
}
