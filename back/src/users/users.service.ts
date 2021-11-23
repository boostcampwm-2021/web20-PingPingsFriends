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

  async findUser(userId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['content'] });
    delete user.password;
    delete user.contentsId;
    return user;
  }

  async create(createUserDto: CreateUserDto, image?: FileDto) {
    const { name, sound, speciesId } = createUserDto;

    if ((name || sound) && speciesId) return false;
    if (!(name || sound) && !speciesId) return false;

    const foundUser = await this.userRepository.findOne({ username: createUserDto.username });
    if (foundUser) return false;

    const contentInfo = getPartialFileInfo(image);

    return await this.userRepository.saveUser(createUserDto, contentInfo);
  }

  async updateImage(image: FileDto, user: any) {
    return await this.userRepository.updateImage(image, user);
  }
}
