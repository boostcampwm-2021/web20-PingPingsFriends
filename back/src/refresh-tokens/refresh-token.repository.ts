import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  async saveRefreshToken(userId: number, refreshToken: string, expireAt: Date) {
    const oldRefreshToken = await this.findOne({ userId: userId });
    if (oldRefreshToken) {
      oldRefreshToken.token = refreshToken;
      oldRefreshToken.expireAt = expireAt;
      return await this.save(oldRefreshToken);
    } else {
      const newRefreshToken = new RefreshToken();
      newRefreshToken.userId = userId;
      newRefreshToken.token = refreshToken;
      newRefreshToken.expireAt = expireAt;
      return await this.save(newRefreshToken);
    }
  }
}
