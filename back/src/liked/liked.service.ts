import { Injectable } from '@nestjs/common';
import { CreateLikedDto } from './dto/create-liked.dto';
import { UpdateLikedDto } from './dto/update-liked.dto';

@Injectable()
export class LikedService {
  create(createLikedDto: CreateLikedDto) {
    return 'This action adds a new liked';
  }

  findAll() {
    return `This action returns all liked`;
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
