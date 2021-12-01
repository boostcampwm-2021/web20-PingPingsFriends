import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('refresh') {
  handleRequest(err: any, user: any, info: any) {
    if (info) {
      if (info.name === 'JsonWebTokenError') {
        throw new HttpException('Error: 잘못된 접근.', 419);
      } else if (info.name === 'TokenExpiredError') {
        throw new HttpException('Error: 인증 기간 만료.', 419); // 401 error 분리
      } else if (info.name === 'Error') {
        throw new HttpException('Error: 승인되지 않은 사용자.', 419);
      }
    }
    if (err) {
      console.log(err);
    }
    return user;
  }
}
