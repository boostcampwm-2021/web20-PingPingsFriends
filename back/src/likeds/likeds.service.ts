import { Injectable } from '@nestjs/common';
import { CreateLikedDto } from './dto/create-liked.dto';
import { UpdateLikedDto } from './dto/update-liked.dto';

@Injectable()
export class LikedsService {
  create(createLikedDto: CreateLikedDto) {
    return 'This action adds a new liked';
  }

  findAll() {
    return `This action returns all likeds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} liked`;
  }

  update(id: number, updateLikedDto: UpdateLikedDto) {
    return `This action updates a #${id} liked`;
  }

  remove(id: number) {
    return `This action removes a #${id} liked`;
  }
}
