import { IUser } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class User implements IUser {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true, select: false })
  password?: string | undefined;

  @Column({ nullable: true })
  accessToken?: string | undefined;

  @Column({ nullable: true })
  refreshToken?: string | undefined;

  @Column()
  loginExpires!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
