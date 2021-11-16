import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { Habitat } from './entities/habitat.entity';

@EntityRepository(Habitat)
export class habitatRepository extends Repository<Habitat> {
  //db 접근로직
  async createHabitat(
    createHabitatDto: CreateHabitatDto,
    leaderId: number
  ): Promise<Habitat> {
    const { name, color } = createHabitatDto;

    const habitat = new Habitat();
    habitat.name = name;
    habitat.color = color;
    habitat.leaderId = leaderId;
    const result = await this.save(habitat);
    return result;
  }

  async selectHabitatList(skip, take) {
    return this.createQueryBuilder('habitat')
      .select('COUNT() AS habitatCount')
      .skip(skip)
      .take(take)
      .groupBy('habitatCount')
      .getMany();
  }
}
