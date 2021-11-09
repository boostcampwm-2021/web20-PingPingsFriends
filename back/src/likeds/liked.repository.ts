import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Post)
export class LikedRepository extends Repository<Post> {
  async createLiked(user_id:number, post_id:number): Promise <User>{
    const result = await 
  }
}