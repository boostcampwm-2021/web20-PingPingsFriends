import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('optional-jwt') {
  handleRequest(err: any, user: any, info: any) {
    return user;
  }
}
