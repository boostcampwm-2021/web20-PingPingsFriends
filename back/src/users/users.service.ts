import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User)
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['likedPost'] });
  }
}
