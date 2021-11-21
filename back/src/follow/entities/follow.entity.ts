import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryColumn({ name: 'following_id' })
  @ApiProperty()
  followingId: number;

  @PrimaryColumn({ name: 'followed_id' })
  @ApiProperty()
  followedid: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'following_id', referencedColumnName: 'id' })
  followingUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'followed_id', referencedColumnName: 'id' })
  followedUser: User;
}
