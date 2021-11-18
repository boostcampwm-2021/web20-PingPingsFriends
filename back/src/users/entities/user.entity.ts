import { Comment } from 'src/comments/entities/comment.entity';
import { Content } from 'src/contents/entities/content.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { Post } from 'src/post/entities/post.entity';
import { Species } from 'src/species/entities/species.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 70 })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({ name: 'habitat_id', nullable: true })
  habitatId: number;

  @Column({ name: 'species_id', nullable: true })
  speciesId: number;

  @Column({ name: 'contents_id', nullable: true })
  contentsId: number;

  @OneToOne(() => Content, (content) => content.user, { cascade: ['insert'] })
  @JoinColumn({ name: 'contents_id', referencedColumnName: 'id' })
  content: Content;

  @ManyToOne(() => Species, (species) => species.users)
  @JoinColumn({ name: 'species_id', referencedColumnName: 'id' })
  species: Species;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToOne(() => Habitat, (habitat) => habitat.leader)
  myHabitat: Habitat;

  @ManyToOne(() => Habitat, (habitat) => habitat.users)
  @JoinColumn({ name: 'habitat_id', referencedColumnName: 'id' })
  habitat: Habitat;

  @ManyToMany(() => Post, (post) => post.likingUsers)
  likedPosts: Post[];

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      console.log(this.password);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
