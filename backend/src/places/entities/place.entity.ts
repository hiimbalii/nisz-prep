import { IsNotEmpty } from 'class-validator';
import { Move } from 'src/moves/move.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('places')
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  longitude: number;

  @Column()
  @IsNotEmpty()
  latitude: number;

  @Column()
  @IsNotEmpty()
  placeName: string;

  @OneToMany(() => Move, move => move.place)
  moves: Move[];
}
