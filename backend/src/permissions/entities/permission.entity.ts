import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  description: string;

  @Column({ unique: true })
  @IsNotEmpty()
  code: string;

  // @OneToMany(() => Move, move => move.user, { eager: true })
  @ManyToMany(() => User, user => user.permissions)
  @JoinTable()
  users: User[];
}
