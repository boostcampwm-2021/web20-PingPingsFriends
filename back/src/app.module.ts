import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ContentsModule } from './contents/contents.module';
import { PostModule } from './post/post.module';
import { HabitatModule } from './habitat/habitat.module';
import { FollowModule } from './follow/follow.module';
import { SpeciesModule } from './species/species.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { HeartsModule } from './hearts/hearts.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    ContentsModule,
    PostModule,
    HabitatModule,
    FollowModule,
    SpeciesModule,
    HeartsModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
