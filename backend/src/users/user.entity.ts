import { IsNotEmpty } from 'class-validator';
import { Move } from 'src/moves/move.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  infectedDate: Date | null;

  @OneToMany(() => Move, move => move.user)
  moves: Move[];
}
