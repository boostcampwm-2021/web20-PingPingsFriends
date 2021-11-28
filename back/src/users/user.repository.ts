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
}
