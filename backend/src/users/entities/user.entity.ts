import { IsNotEmpty } from 'class-validator';
import { Move } from 'src/moves/entities/move.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  salt: string;

  @Column()
  infectedDate: Date;

  @Column({ nullable: true })
  morning: boolean;

  @OneToMany(() => Move, move => move.user, { eager: true })
  moves: Move[];

  @ManyToMany(() => Permission, permission => permission.users)
  permissions: Permission[];
}
