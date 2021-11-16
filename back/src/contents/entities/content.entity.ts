import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'contents' })
export class Content {
  @PrimaryGeneratedColumn({ name: 'contents_id' })
  id: number;

  @Column({ length: 255 })
  url: string;

  @Column({ length: 20, name: 'mime_type' })
  mimeType: string;

  @OneToOne(() => User, (user) => user.content)
  user: User;

  @OneToOne(() => PostContent, (postContent) => postContent.content)
  postContent: PostContent;
}
