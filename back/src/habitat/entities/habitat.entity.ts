import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Habitat {
  @PrimaryGeneratedColumn({ name: 'habitat_id' })
  @ApiProperty()
  id: number;

  @Column({ length: 20 })
  @ApiProperty()
  name: string;

  @Column({ length: 20 })
  @ApiProperty()
  color: string;

  @Column({ nullable: true, name: 'leader_id' })
  @ApiProperty()
  leaderId: number;

  @OneToOne(() => User, (user) => user.myHabitat)
  @JoinColumn({ name: 'leader_id', referencedColumnName: 'id' })
  leader: User;

  @OneToMany(() => User, (user) => user.habitat)
  users: User[];

  @OneToMany(() => Post, (post) => post.habitat)
  posts: Post[];
}
