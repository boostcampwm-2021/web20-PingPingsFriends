import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
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

  findAll() {
    return `This action returns all species`;
  }
}
