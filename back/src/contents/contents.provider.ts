import { Connection } from 'typeorm';
import { Content } from './entities/content.entity';

export const contentsProviders = [
  {
    provide: 'CONTENTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Content),
    inject: ['DATABASE_CONNECTION'],
  },
];
