import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (info) {
      if (info.name === 'JsonWebTokenError') {
        throw new HttpException('Error: 잘못된 접근입니다.', HttpStatus.UNAUTHORIZED);
      } else if (info.name === 'TokenExpiredError') {
        throw new HttpException('Error: 인증 기간이 만료되었습니다.', HttpStatus.UNAUTHORIZED);
      } else if (info.name === 'Error') {
        throw new HttpException('Error: 승인되지 않은 사용자입니다.', HttpStatus.UNAUTHORIZED);
      }
    }
    if (err) {
      console.log(err);
    }
    return user;
  }
}
