import { EntityRepository, Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@EntityRepository(Species)
export class SpeciesRepository extends Repository<Species> {
  async selectSpeciesListByCursor(lastId: number, limit: number) {
    return await this.createQueryBuilder('species')
      .select(['species.id', 'species.name', 'species.sound'])
      .where('species.id < :lastId', { lastId })
      .orderBy('species.id', 'DESC')
      .take(limit)
      .getMany();
  }

  async selectSpeciesListFirst(limit: number) {
    return await this.createQueryBuilder('species')
      .select(['species.id', 'species.name', 'species.sound'])
      .orderBy('species.id', 'DESC')
      .take(limit)
      .getMany();
  }
}
