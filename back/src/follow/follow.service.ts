import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowRepository)
    private followRepository: FollowRepository
  ) {}
  create(targetid: number, userId: number) {
    const follow = new Follow();
    follow.followingId = targetid;
    follow.followedId = userId;
    return this.followRepository.save(follow);
  }

  // findAll() {
  //   return `This action returns all follow`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} follow`;
  // }

  // update(id: number, updateFollowDto: UpdateFollowDto) {
  //   return `This action updates a #${id} follow`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} follow`;
  // }
}
