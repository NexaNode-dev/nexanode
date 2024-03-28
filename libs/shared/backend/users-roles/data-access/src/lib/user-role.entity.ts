import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class UserRole {
  @PrimaryColumn('uuid')
  id: string = uuidv7();
  @Column()
  userId!: string;
  @Column()
  roleId!: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<UserRole>) {
    Object.assign(this, partial);
  }
}
