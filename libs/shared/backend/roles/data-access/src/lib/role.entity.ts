import { IRole } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('roles')
export class Role implements IRole {
  @PrimaryColumn('uuid')
  id: string = uuidv7();
  @Column({ unique: true })
  name!: string;
  @Column({ nullable: true })
  description?: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IRole>) {
    Object.assign(this, partial);
  }
}
