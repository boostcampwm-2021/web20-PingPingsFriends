import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { S3Module } from './s3/s3.module';
import { ContentsModule } from './contents/contents.module';
import { PostContentsModule } from './post-contents/post-contents.module';
import { PostModule } from './post/post.module';
import { HabitatModule } from './habitat/habitat.module';
import { FollowModule } from './follow/follow.module';
import { SpeciesModule } from './species/species.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { HeartsModule } from './hearts/hearts.module';
import databaseConfig from './database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    S3Module,
    ContentsModule,
    PostContentsModule,
    PostModule,
    HabitatModule,
    FollowModule,
    SpeciesModule,
    HeartsModule,
    CommentsModule,
  ],
})
export class AppModule {}
