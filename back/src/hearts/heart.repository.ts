import { EntityRepository, Repository } from 'typeorm';
import { Heart } from './entities/heart.entity';

@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {}
