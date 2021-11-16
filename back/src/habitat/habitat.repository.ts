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
}
