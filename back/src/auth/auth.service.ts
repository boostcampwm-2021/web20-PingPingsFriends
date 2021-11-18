import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async validateUser(beforeUsername: string, beforePassword: string) {
    const user = await this.userRepository.findOne({ username: beforeUsername });

    if (!user || !compare(beforePassword, user.password)) return null;

    const result = {
      id: user.id,
      username: user.username,
    };

    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sup: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
