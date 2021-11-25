import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtOption, jwtRefeshOption } from 'config/auth.config';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

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
    return {
      accessToken: this.jwtService.sign(payload, jwtOption),
      refreshToken: this.jwtService.sign(payload, jwtRefeshOption),
    };
  }

  async refreshAccessToken(token: string) {
    const { username, sub, exp } = this.jwtService.verify(token, {
      secret: jwtRefeshOption.secret,
    });
    const user = await this.userRepository.findOne({ id: sub });
    if (!user) throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);
    if (user.refreshToken !== token)
      throw new HttpException('Error: 잘못된 요청입니다.', HttpStatus.BAD_REQUEST);
    if (new Date(exp * 1000) < new Date())
      throw new HttpException('Error: 인증이 만료되었습니다.', HttpStatus.UNAUTHORIZED);
    const accessToken = this.jwtService.sign({ username, sub }, jwtOption);
    return accessToken;
  }
}
