import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./entities/comment.entity";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  //db 접근로직 
  async createComment(createCommentDto: CreateCommentDto): Promise <Comment>{
    const { post_id, content} = createCommentDto;

    const comment = new Comment();
    const post = new Post();
    const user = new User();

    post.id = post_id;
    user.id = 1;

    comment.post = post;
    comment.content = content;
    comment.user = user;
    const result = await this.save(comment);
    console.log(result)
    return comment
  }
}