import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
