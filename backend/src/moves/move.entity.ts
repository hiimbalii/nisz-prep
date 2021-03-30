import { IsNotEmpty } from 'class-validator';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('moves')
export class Move extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @ManyToOne(() => Place, place => place.moves)
  place: number;

  @IsNotEmpty()
  @ManyToOne(() => User, user => user.moves)
  user: number;
}
