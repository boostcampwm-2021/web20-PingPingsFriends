import { ApiProperty } from '@nestjs/swagger';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'contents' })
export class Content {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'contents_id' })
  id: number;

  @ApiProperty()
  @Column({ length: 255 })
  url: string;

  @ApiProperty()
  @Column({ length: 20, name: 'mime_type' })
  mimeType: string;

  @OneToOne(() => User, (user) => user.content)
  user: User;

  @OneToOne(() => PostContent, (postContent) => postContent.content)
  postContent: PostContent;
}
