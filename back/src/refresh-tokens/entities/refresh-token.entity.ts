import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @Column({ length: 200, unique: true })
  token: string;

  @Column({ name: 'expire_at' })
  expireAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
