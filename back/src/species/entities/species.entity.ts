import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn({ name: 'species_id' })
  id: number;

  @Column({ length: 50 })
  sound: string;

  @Column({ length: 10 })
  name: string;

  @OneToMany(() => User, (user) => user.species)
  users: User[];
}
