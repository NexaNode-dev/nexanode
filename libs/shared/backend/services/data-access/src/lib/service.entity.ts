import { IService } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Service implements IService {
  @PrimaryColumn()
  id: string = uuidv7();

  @Column({ unique: true })
  name!: string;

  @Column()
  summary!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  category?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IService>) {
    Object.assign(this, partial);
  }
}
