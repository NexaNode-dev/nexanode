import { IRole } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

export class Role implements IRole {
  @PrimaryColumn('uuid')
  id: string = uuidv7();
  @Column({ unique: true })
  name!: string;
  @Column({ nullable: true })
  description?: string | undefined;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IRole>) {
    Object.assign(this, partial);
  }
}
