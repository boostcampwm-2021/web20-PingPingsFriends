import { EntityRepository, Repository } from 'typeorm';
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

  async selectHabitatList(skip: number, take: number) {
    return this.createQueryBuilder('habitat')
      .select('habitat')
      .addSelect(
        '(SELECT count(*) from user u where u.habitat_id = habitat.habitat_id)',
        'userCnt'
      )
      .orderBy('userCnt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
  }
}
