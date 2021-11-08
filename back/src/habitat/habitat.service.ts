import { Injectable } from '@nestjs/common';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';

@Injectable()
export class HabitatService {
  create(createHabitatDto: CreateHabitatDto) {
    return 'This action adds a new habitat';
  }

  findAll() {
    return `This action returns all habitat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habitat`;
  }

  update(id: number, updateHabitatDto: UpdateHabitatDto) {
    return `This action updates a #${id} habitat`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitat`;
  }
}
