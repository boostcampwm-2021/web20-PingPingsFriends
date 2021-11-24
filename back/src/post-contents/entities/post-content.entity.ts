import { Content } from 'src/contents/entities/content.entity';
import { Post } from 'src/post/entities/post.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'post_contents' })
export class PostContent {
  @PrimaryColumn({ name: 'post_id' })
  postId: number;

  @PrimaryColumn({ name: 'contents_id' })
  contentsId: number;

  @ManyToOne(() => Post, (post) => post.postContents)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: Post;

  @OneToOne(() => Content, (content) => content.postContent, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contents_id', referencedColumnName: 'id' })
  content: Content;
}
