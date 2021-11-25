import FileDto from 'common/dto/transformFileDto';
import { Content } from 'src/contents/entities/content.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
