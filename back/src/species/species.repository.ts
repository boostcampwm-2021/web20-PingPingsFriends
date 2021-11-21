import { EntityRepository, Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@EntityRepository(Species)
export class SpeciesRepository extends Repository<Species> {}
