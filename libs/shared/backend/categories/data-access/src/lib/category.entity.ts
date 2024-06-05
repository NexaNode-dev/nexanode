import { ICategory } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Category implements ICategory {
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

  constructor(partial: Partial<ICategory>) {
    Object.assign(this, partial);
  }

  static setTableName(prefix: string) {
    const tableName = `${prefix}_categories`;
    Reflect.defineMetadata('tableName', tableName, Category);
  }
}
