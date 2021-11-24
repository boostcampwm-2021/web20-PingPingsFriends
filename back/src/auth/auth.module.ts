import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtOption } from 'config/auth.config';
import { RefreshTokenRepository } from 'src/refresh-tokens/refresh-token.repository';
import { UserRepository } from 'src/users/user.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RefreshTokenRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtOption.secret,
      signOptions: { expiresIn: jwtOption.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
