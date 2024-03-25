import { IPermission } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Permission implements IPermission {
  @PrimaryColumn('uuid')
  id: string = uuidv7();
  @Column({ unique: true })
  name!: string;
  @Column({ nullable: true })
  description?: string | undefined;
  @Column()
  action!: string;
  @Column()
  subject!: string;
  @Column('json', { nullable: true })
  conditions?: object | undefined;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IPermission>) {
    Object.assign(this, partial);
  }
}
