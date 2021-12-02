import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtOption, jwtRefeshOption } from 'config/auth.config';

const fromAuthCookie = function () {
  return function (request) {
    let token = null;
    if (request && request.cookies) {
      token = request.cookies['refreshToken'];
    }
    return token;
  };
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: fromAuthCookie(),
      ignoreExpiration: false,
      secretOrKey: jwtRefeshOption.secret,
    });
    console.log(ExtractJwt.fromHeader('Cookie'));
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
