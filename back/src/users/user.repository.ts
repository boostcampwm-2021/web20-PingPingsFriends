import FileDto from 'common/dto/transformFileDto';
import { CreateContentDto } from 'src/contents/dto/create-content.dto';
import { Content } from 'src/contents/entities/content.entity';
import { Species } from 'src/species/entities/species.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveUser(createUserDto: CreateUserDto, contentInfo?: CreateContentDto) {
    const user = new User();

    const { name, sound, speciesId } = createUserDto;

    user.username = createUserDto.username;
    user.nickname = createUserDto.nickname;
    user.password = createUserDto.password;
    user.habitatId = createUserDto.habitatId;

    if (speciesId) user.speciesId = speciesId;
    else {
      const species = new Species();
      species.name = name;
      species.sound = sound;
      user.species = species;
    }

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

  async selectUserInfo(id: number) {
    return await this.query(
      `SELECT u.user_id as userId, u.nickname as nickName, c.url FROM user u
    LEFT JOIN contents c ON c.contents_id = u.contents_id
    WHERE u.user_id = ?;`,
      [id]
    );
  }

  async updateImage(image: FileDto, user: any) {
    const originalUser = await this.findOne(user.id, { relations: ['content'] });
    if (!originalUser) return false;

    const content = new Content();
    content.url = image.location;
    content.mimeType = image.mimetype;
    originalUser.content = content;
    return await this.save(originalUser);
  }
}
