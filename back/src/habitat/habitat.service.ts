import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { PostRepository } from 'src/post/post.repository';
import { UserRepository } from 'src/users/user.repository';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { IsDuplicatedDto } from './dto/is-duplicated.dto';
import { HabitatRepository } from './habitat.repository';

@Injectable()
export class HabitatService {
  constructor(
    private readonly habitatRepository: HabitatRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  createHabitat(createHabitatDto: CreateHabitatDto, leaderId: number) {
    return this.habitatRepository.createHabitat(createHabitatDto, leaderId);
  }

  getHabitatList({ skip, take }: PaginationQueryDto) {
    return this.habitatRepository.selectHabitatList(skip, take);
  }

  async getHabitatInfo(habitatId: number) {
    const habitat = await this.habitatRepository.findOneOrFail(habitatId);
    const [userCnt, postCnt, recentUsers, leader] = await Promise.all([
      this.userRepository.count({ habitat }),
      this.postRepository.count({ habitat }),
      this.postRepository.selectTopPostUserInfo(3),
      this.userRepository.selectUserInfo(habitat.leaderId),
    ]);
    return {
      habitat,
      leader: leader.length ? leader[0] : null,
      userCnt,
      postCnt,
      recentUsers,
      lastActTime: recentUsers[0].createdAt,
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
