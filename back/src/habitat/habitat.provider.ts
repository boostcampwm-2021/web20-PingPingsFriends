import { Connection } from 'typeorm';
import { Habitat } from './entities/habitat.entity';

export const habitatProviders = [
  {
    provide: 'HABITAT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Habitat),
    inject: ['DATABASE_CONNECTION'],
  },
];
