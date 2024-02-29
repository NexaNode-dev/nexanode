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
  phone?: string | undefined;
  @Column({ nullable: true })
  url?: string | undefined;
  @Column({ nullable: true })
  address?: string | undefined;
  @Column({ nullable: true })
  city?: string | undefined;
  @Column({ nullable: true })
  state?: string | undefined;
  @Column({ nullable: true })
  zip?: string | undefined;
  @Column({ nullable: true })
  country?: string | undefined;
  @Column({ nullable: true })
  subject?: string | undefined;
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
