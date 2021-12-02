import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import FileDto from 'common/dto/transformFileDto';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { Species } from 'src/species/entities/species.entity';
import { Connection } from 'typeorm';
import { isAllTrueOrFalse } from 'utils/condition-check.util';
import { getPartialFileInfo } from 'utils/s3.util';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly connection: Connection
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async check(username?: string, nickname?: string) {
    if (isAllTrueOrFalse(username, nickname))
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);

    let user: User;
    if (username) user = await this.userRepository.findOne({ username });
    if (nickname) user = await this.userRepository.findOne({ nickname });

    return !!user;
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOne(userId, { relations: ['content'] });

    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    delete user.password;
    delete user.contentsId;
    delete user.refreshToken;

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
    const { habitatId, habitatName, habitatColor } = createUserDto;
    const { speciesId, speciesName, speciesSound } = createUserDto;

    if (isAllTrueOrFalse(habitatId, habitatName, habitatColor))
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);

    if (isAllTrueOrFalse(speciesId, speciesName, speciesSound))
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);

    const contentInfo = getPartialFileInfo(image);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const userRepository = queryRunner.manager.getRepository(User);
    const habitatRepository = queryRunner.manager.getRepository(Habitat);

    const user = await userRepository.findOne({ username: createUserDto.username });
    if (user) throw new HttpException('Error: 이미 존재하는 회원입니다.', HttpStatus.BAD_REQUEST);

    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.nickname = createUserDto.nickname;
    newUser.password = createUserDto.password;

    if (speciesId) newUser.speciesId = speciesId;
    else {
      const species = new Species();
      species.name = speciesName;
      species.sound = speciesSound;
      newUser.species = species;
    }

    if (contentInfo) {
      const content = new Content();
      content.url = contentInfo.url;
      content.mimeType = contentInfo.mimeType;
      newUser.content = content;
    }

    await queryRunner.startTransaction();

    try {
      if (!habitatId) {
        const habitat = new Habitat();
        habitat.name = habitatName;
        habitat.color = habitatColor;

        const newHabitat = await habitatRepository.save(habitat);
        newUser.habitatId = newHabitat.id;

        const newUserId = (await userRepository.save(newUser)).id;
        newHabitat.leaderId = newUserId;

        await habitatRepository.save(newHabitat);
      } else {
        newUser.habitatId = habitatId;
        await userRepository.save(newUser);
      }

      await queryRunner.commitTransaction();

      return true;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async updateImage(contentInfo: CreateContentDto, userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const userRepository = queryRunner.manager.getRepository(User);
    const contentRepository = queryRunner.manager.getRepository(Content);

    const user = await userRepository.findOne(userId, { relations: ['content'] });
    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    await queryRunner.startTransaction();

    try {
      if (user.content) {
        delete user.contentsId;
        await contentRepository.remove(user.content);
      }
      const content = new Content();
      content.url = contentInfo.url;
      content.mimeType = contentInfo.mimeType;
      user.content = content;
      await userRepository.save(user);

      await queryRunner.commitTransaction();

      return true;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async logout(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user)
      throw new HttpException('Error: 존재하지 않는 사용자입니다.', HttpStatus.BAD_REQUEST);

    if (user.refreshToken !== refreshToken)
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);

    user.refreshToken = null;

    return await this.userRepository.save(user);
  }
}
