import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { userResponseDto } from './dto/userResponseDto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOption from 'config/s3.config';
import { ParseUsernamePipe } from 'pipes/validation-sign-up.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post('register')
  @UseInterceptors(FileInterceptor('upload', multerOption))
  register(
    @Body(ParseUsernamePipe) createUserDto: CreateUserDto,
    @UploadedFile() image: Express.MulterS3.File
  ) {
    return this.usersService.create(createUserDto, image);
  }
}
