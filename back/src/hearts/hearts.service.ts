import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { Heart } from './entities/heart.entity';
import { HeartRepository } from './heart.repository';

@Injectable()
export class HeartsService {
  constructor(
    @InjectRepository(HeartRepository)
    private heartRepository: HeartRepository
  ) {}

  async setHeart(postId: number, userId: number) {
    const heart = new Heart();
    heart.postId = postId;
    heart.userId = userId;
    const result = await this.heartRepository.createLiked(heart);
    return this.heartRepository.countPostLiked(postId);
  }

  async deleteHeart(postId: number, userId: number) {
    const heart = new Heart();
    heart.postId = postId;
    heart.userId = userId;
    const result = await this.heartRepository.deleteLiked(heart);
    return this.heartRepository.countPostLiked(postId);
  }

  async getHeartCount(postId: number) {
    return this.heartRepository.countPostLiked(postId);
  }

  async getAllLikedUser(postId: number, { skip, take }: PaginationQueryDto) {
    return this.heartRepository.getLikedList(postId, skip, take);
  }

  async findOne(userId: number, postId: number) {
    return await this.heartRepository
      .createQueryBuilder('heart')
      .where('heart.postId = :postId AND heart.userId = :userId', {
        postId: postId,
        userId: userId,
      })
      .getCount();
  }
}
