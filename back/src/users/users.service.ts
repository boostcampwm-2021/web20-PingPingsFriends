import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import FileDto from 'common/dto/transformFileDto';
import { getPartialFileInfo } from 'utils/s3.util';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async check(username?: string, nickname?: string) {
    const orCheck = username || nickname;
    const andCheck = username && nickname;
    if (!orCheck || andCheck)
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);

    let user;
    if (username) user = await this.userRepository.findOne({ username });
    if (nickname) user = await this.userRepository.findOne({ nickname });

    return !!user;
  }
  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['content'] });

    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    delete user.password;
    delete user.contentsId;

    return user;
  }

  async findUserInfo(userId: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.username',
        'user.nickname',
        'habitat.id',
        'habitat.name',
        'species.name',
        'content',
      ])
      .leftJoin('user.habitat', 'habitat')
      .leftJoin('user.species', 'species')
      .leftJoin('user.content', 'content')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async createRefreshToken(userId: number, refreshToken: string) {
    let user = await this.userRepository.findOne(userId, { relations: ['content'] });

    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    user.refreshToken = refreshToken;
    user = await this.userRepository.save(user);

    delete user.password;
    delete user.contentsId;

    return user;
  }

  async create(createUserDto: CreateUserDto, image?: FileDto) {
    const { name, sound, speciesId } = createUserDto;

    if (((name || sound) && speciesId) || (!(name || sound) && !speciesId))
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);

    const foundUser = await this.userRepository.findOne({ username: createUserDto.username });
    if (foundUser)
      throw new HttpException('Error: 이미 존재하는 회원입니다.', HttpStatus.BAD_REQUEST);

    const contentInfo = getPartialFileInfo(image);

    return await this.userRepository.saveUser(createUserDto, contentInfo);
  }

  async updateImage(image: FileDto, user: any) {
    return await this.userRepository.updateImage(image, user);
  }
}
