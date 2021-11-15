import { EntityRepository, Repository } from 'typeorm';
import { Heart } from './entities/heart.entity';

@EntityRepository(Heart)
export class HeartRepository extends Repository<Heart> {
  async createLiked(heart: Heart) {
    return this.save(heart);
  }
  async deleteLiked(heart: Heart) {
    return this.delete(heart);
  }
  async countPostLiked(postId: number) {
    return this.count({ postId });
  }
  async getLikedList(postId: number, skip: number, take: number) {
    // return this.find({ postId, skip: 0, take: 10 });

    return this.createQueryBuilder('heart')
      .where('heart.postId = :postId', { postId })
      .skip(skip)
      .take(take)
      .getMany();
  }
}
