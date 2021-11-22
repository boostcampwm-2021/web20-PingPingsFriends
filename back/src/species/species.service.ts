import { Injectable } from '@nestjs/common';
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

  create({ name, sound }: CreateSpeciesDto) {
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
}
