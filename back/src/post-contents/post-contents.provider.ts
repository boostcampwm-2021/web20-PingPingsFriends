import { Connection } from 'typeorm';
import { PostContent } from './entities/post-content.entity';

export const postContentProviders = [
  {
    provide: 'POSTCONTENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(PostContent),
    inject: ['DATABASE_CONNECTION'],
  },
];
