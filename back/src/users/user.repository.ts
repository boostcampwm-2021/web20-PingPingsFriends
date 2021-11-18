import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(createUserDto: CreateUserDto, contentInfo?: CreateContentDto) {
    const user = new User();

    user.username = createUserDto.username;
    user.nickname = createUserDto.nickname;
    user.password = createUserDto.password;
    user.habitatId = createUserDto.habitatId;
    user.speciesId = createUserDto.speciesId;

    if (contentInfo) {
      const content = new Content();
      content.url = contentInfo.url;
      content.mimeType = contentInfo.mimeType;
      user.content = content;
    }

    try {
      return (await this.save(user)).id;
    } catch (err) {
      return false;
    }
  }
}
