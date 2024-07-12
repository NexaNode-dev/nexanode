import {
  IMedia,
  IMediaMetadata,
  IMediaStorageType,
  IMediaType,
} from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('media')
export class Media implements IMedia {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column()
  name!: string;

  @Column()
  originalName!: string;

  @Column('jsonb')
  type!: IMediaType;

  @Column('jsonb')
  storageType!: IMediaStorageType;

  @Column('jsonb')
  metadata!: IMediaMetadata;

  @Column()
  url!: string;

  @Column('uuid')
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IMedia>) {
    Object.assign(this, partial);
  }
}
