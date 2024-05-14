import { IContact } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Contact implements IContact {
  @PrimaryColumn('uuid')
  id: string = uuidv7();
  @Column()
  name!: string;
  @Column()
  email!: string;
  @Column({ nullable: true })
  phone?: string;
  @Column({ nullable: true })
  url?: string;
  @Column({ nullable: true })
  address?: string;
  @Column({ nullable: true })
  city?: string;
  @Column({ nullable: true })
  state?: string;
  @Column({ nullable: true })
  zip?: string;
  @Column({ nullable: true })
  country?: string;
  @Column({ nullable: true })
  subject?: string;
  @Column('text')
  message!: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IContact>) {
    Object.assign(this, partial);
  }
}
