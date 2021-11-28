import FileDto from 'common/dto/transformFileDto';
import { Content } from 'src/contents/entities/content.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getPartialFileInfo } from '../../utils/s3.util';

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

  async updateImage(image: FileDto, userId: number) {
    const originalUser = await this.findOne(userId, { relations: ['content'] });
    if (!originalUser) return false;

    const contentInfo = getPartialFileInfo(image);

    const content = new Content();

    //todo: 이부분 수정 부탁드립니다
    content.url = contentInfo.url.replace('-profile', '');
    // content.url = contentInfo.url;

    content.mimeType = contentInfo.mimeType;
    originalUser.content = content;
    return await this.save(originalUser);
  }
}
