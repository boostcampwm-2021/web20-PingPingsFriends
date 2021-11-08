import { Comment } from 'src/comment/entities/comment.entity';
import { Content } from 'src/contents/entities/content.entity';
import { Habitat } from 'src/habitat/entities/habitat.entity';
import { Post } from 'src/post/entities/post.entity';
import { Species } from 'src/species/entities/species.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @OneToOne(() => Content, (content) => content.user)
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

  @ManyToMany(() => Post, (post) => post.likingUser)
  likedPost: Post[];
}
