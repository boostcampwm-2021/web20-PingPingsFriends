import { Connection } from 'typeorm';
import { Species } from './entities/species.entity';

export const speciesProviders = [
  {
    provide: 'SPECIES_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Species),
    inject: ['DATABASE_CONNECTION'],
  },
];
