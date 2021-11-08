import { Connection } from 'typeorm';
import { Post } from './entities/post.entity';

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: ['DATABASE_CONNECTION'],
  },
];
