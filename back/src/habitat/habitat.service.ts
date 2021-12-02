import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { PostRepository } from 'src/post/post.repository';
import { UserRepository } from 'src/users/user.repository';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { HabitatRepository } from './habitat.repository';

@Injectable()
export class HabitatService {
  constructor(
    private readonly habitatRepository: HabitatRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async createHabitat(createHabitatDto: CreateHabitatDto, leaderId: number) {
    if (await this.isDuplicate(createHabitatDto.name))
      throw new HttpException('Error: 중복된 서식지 이름입니다.', HttpStatus.BAD_REQUEST);
    return this.habitatRepository.createHabitat(createHabitatDto, leaderId);
  }

  getHabitatList({ skip, take }: PaginationQueryDto) {
    return this.habitatRepository.selectHabitatList(skip, take);
  }

  async getHabitatInfo(habitatId: number) {
    const habitat = await this.habitatRepository.findOneOrFail(habitatId);
    const [userCnt, postCnt, recentUsers, leader] = await Promise.all([
      this.userRepository.count({ habitatId }), // 서식지에 속해있는 유저 조회
      this.postRepository.count({ habitatId }), // 서식지에 속해있는 post 조회
      this.postRepository.selectTopPostUserInfo(3, habitatId), //
      this.userRepository.selectUserInfo(habitat.leaderId),
    ]);

    return {
      habitat,
      leader: leader.length ? leader[0] : null,
      userCnt,
      postCnt,
      recentUsers,
      lastActTime: recentUsers.length !== 0 ? recentUsers[0].createdAt : '',
    };
  }

  async getRandomHabitat(currentId: number) {
    const result = await this.habitatRepository.selectRandomHabitat(currentId);
    return result.map(({ id }) => id);
  }

  async isDuplicate(name: string) {
    const result = await this.habitatRepository.findOne({ name });
    return result ? true : false;
  }
}
