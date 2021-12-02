import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursorPaginationDto } from 'common/dto/cursor-pagination.dto';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
import { SpeciesRepository } from './species.repository';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesRepository)
    private speciesRepository: SpeciesRepository
  ) {}

  async create({ name, sound }: CreateSpeciesDto) {
    if (await this.isDuplicate(name))
      throw new HttpException('Error: 중복된 동물 카테고리 이름입니다.', HttpStatus.BAD_REQUEST);
    const species = new Species();
    species.name = name;
    species.sound = sound;
    return this.speciesRepository.save(species);
  }

  getSpeciestList(cursorPaginationDto: CursorPaginationDto) {
    const { limit } = cursorPaginationDto;
    return cursorPaginationDto.lastId === undefined
      ? this.speciesRepository.selectSpeciesListFirst(limit)
      : this.speciesRepository.selectSpeciesListByCursor(cursorPaginationDto.lastId, limit);
  }

  async isDuplicate(name: string) {
    const result = await this.speciesRepository.findOne({ name });
    return result ? true : false;
  }
}
