import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtOption, jwtRefeshOption } from 'config/auth.config';
import { RefreshTokenRepository } from 'src/refresh-tokens/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async validateUser(beforeUsername: string, beforePassword: string) {
    const user = await this.userRepository.findOne({ username: beforeUsername });

    if (!user || !(await compare(beforePassword, user.password))) return null;

    const result = {
      id: user.id,
      username: user.username,
    };

    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const now = new Date();
    const expireAt = new Date(now.setDate(now.getDate() + 1));
    return {
      accessToken: this.jwtService.sign(payload, jwtOption),
      refreshToken: this.jwtService.sign(payload, jwtRefeshOption),
      refreshTokenExpireAt: expireAt,
    };
  }

  async refreshAccessToken(token: string) {
    const { username, sub } = this.jwtService.verify(token, {
      secret: jwtRefeshOption.secret,
    });
    const refreshToken = await this.refreshTokenRepository.findOne({ token });
    if (!refreshToken) return false;
    if (refreshToken.expireAt < new Date()) return false;
    const accessToken = this.jwtService.sign({ username, sub }, jwtOption);
    return accessToken;
  }
}
