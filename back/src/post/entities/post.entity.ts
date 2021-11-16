import { Comment } from 'src/comments/entities/comment.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { Heart } from 'src/hearts/entities/heart.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: number;

  @Column({ length: 500, name: 'human_content' })
  humanContent: string;

  @Column({ length: 500, name: 'animal_content' })
  animalContent: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'habitat_id' })
  habitatId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Habitat, (habitat) => habitat.posts)
  @JoinColumn({ name: 'habitat_id', referencedColumnName: 'id' })
  habitat: Habitat;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable({
    name: 'heart',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  likingUsers: User[];

  @OneToMany(() => PostContent, (postContent) => postContent.post, {
    cascade: ['insert'],
  })
  postContents: PostContent[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Heart, (heart) => heart.post)
  hearts: Heart[];
}
