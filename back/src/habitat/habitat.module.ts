import { Module } from '@nestjs/common';
import { HabitatService } from './habitat.service';
import { HabitatController } from './habitat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitatRepository } from './habitat.repository';
import { UserRepository } from 'src/users/user.repository';
import { PostRepository } from 'src/post/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HabitatRepository,
      UserRepository,
      PostRepository,
    ]),
  ],
  controllers: [HabitatController],
  providers: [HabitatService],
})
export class HabitatModule {}
