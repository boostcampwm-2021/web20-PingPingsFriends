import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { RefreshTokenRepository } from 'src/refresh-tokens/refresh-token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
