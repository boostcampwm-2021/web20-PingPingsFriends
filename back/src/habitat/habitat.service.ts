import { Injectable } from '@nestjs/common';
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

  createHabitat(
    createHabitatDto: CreateHabitatDto,
    leaderId: number
  ) {
    return this.habitatRepository.createHabitat(
      createHabitatDto,
      leaderId
    );
  }

  getHabitatList({ skip, take }: PaginationQueryDto) {
    return this.habitatRepository.selectHabitatList(skip, take);
  }

  async getHabitatInfo(habitatId: number) {
    const habitat = await this.habitatRepository.findOneOrFail(
      habitatId
    );
    const [userCnt, postCnt, recentThreeUser] = await Promise.all([
      this.userRepository.count({ habitat }),
      this.postRepository.count({ habitat }),
      this.postRepository.find({
        take: 3,
        order: { createdAt: 'DESC' },
        select: ['userId', 'createdAt'],
      }),
    ]);
    return {
      leaderId: habitat.leaderId,
      userCnt,
      postCnt,
      recentThreeUser,
      lastActTime: recentThreeUser[0].createdAt,
    };
  }

  getRandomHabitat(currentId: number) {
    return this.habitatRepository.selectRandomHabitat(currentId);
  }
}
