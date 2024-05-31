import { IOrganisation } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('organisations')
export class Organisation implements IOrganisation {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  typeId!: string;

  @Column({ nullable: true })
  registrationNumber?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IOrganisation>) {
    Object.assign(this, partial);
  }
}
