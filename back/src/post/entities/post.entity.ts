import { Comment } from 'src/comment/entities/comment.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { PostContent } from 'src/post-contents/entities/post-content.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: number;

  @Column({ length: 500, name: 'human_content' })
  humanContent: string;

  @Column({ length: 500, name: 'animal_content' })
  animalContent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Habitat, (habitat) => habitat.posts)
  @JoinColumn({ name: 'habitat_id', referencedColumnName: 'id' })
  habitat: Habitat;

  @ManyToMany(() => User, (user) => user.likedPost)
  @JoinTable({
    name: 'liked',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  likingUser: User[];

  @OneToMany(() => PostContent, (postContent) => postContent.post)
  postContents: PostContent[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
