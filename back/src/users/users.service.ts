import { Injectable } from '@nestjs/common';
import FileDto from 'common/dto/transformFileDto';
import { getPartialFileInfo } from 'utils/s3.util';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['likedPost'] });
  }

  async create(createUserDto: CreateUserDto, image?: FileDto) {
    const foundUser = await this.userRepository.findOne({ username: createUserDto.username });
    if (foundUser) return false;

    const contentInfo = getPartialFileInfo(image);

    return await this.userRepository.saveUser(createUserDto, contentInfo);
  }
}
