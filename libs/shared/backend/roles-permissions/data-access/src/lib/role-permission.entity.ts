import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class RolePermission {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column('uuid')
  @Index()
  roleId!: string;

  @Column('uuid')
  @Index()
  permissionId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<RolePermission>) {
    Object.assign(this, partial);
  }
}
