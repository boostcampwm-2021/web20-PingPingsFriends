import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Habitat {
  @PrimaryGeneratedColumn({ name: 'habitat_id' })
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 20 })
  color: string;

  @OneToOne(() => User, (user) => user.myHabitat)
  leader: User;

  @OneToMany(() => User, (user) => user.habitat)
  users: User[];

  @OneToMany(() => Post, (post) => post.habitat)
  posts: Post[];
}
