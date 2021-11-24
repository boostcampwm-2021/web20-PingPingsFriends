import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (info) {
      if (info.name === 'JsonWebTokenError') {
        console.log('조작된 토큰');
      } else if (info.name === 'TokenExpiredError') {
        console.log('만료된 토큰');
      } else if (info.name === 'Error') {
        console.log('로그인이 안 되어 있음(토큰이 없음)');
      }
    }
    if (err) {
      console.log(err);
    }
    return user;
  }
}
