import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { habitatRepository } from './habitat.repository';

@Injectable()
export class HabitatService {
  constructor(
    private readonly habitatRepository: habitatRepository
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
