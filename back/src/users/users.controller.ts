import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { userResponseDto } from './dto/userResponseDto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: '유저 조회',
    description: '모든 유저를 조회하는 api입니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: [userResponseDto] })
  findAll() {
    return this.usersService.findAll();
  }
}
