import { IUser } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('users')
export class User implements IUser {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column({ unique: true })
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true })
  loginExpires?: Date;

  @Column({ default: false })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
