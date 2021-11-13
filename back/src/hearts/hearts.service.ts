import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHeartDto } from './dto/create-heart.dto';
import { UpdateHeartDto } from './dto/update-heart.dto';
import { Heart } from './entities/heart.entity';

@Injectable()
export class HeartsService {
  constructor(
    @InjectRepository(Heart)
    private heartRepository: Repository<Heart>
  ) {}

  findAll() {
    return `This action returns all hearts`;
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

  update(id: number, updateHeartDto: UpdateHeartDto) {
    return `This action updates a #${id} heart`;
  }

  remove(id: number) {
    return `This action removes a #${id} heart`;
  }
}
