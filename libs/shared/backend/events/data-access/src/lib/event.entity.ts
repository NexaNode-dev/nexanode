import { IEvent } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('events')
export class Event implements IEvent {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  from!: Date;

  @Column({ nullable: true })
  to?: Date;

  @Column()
  location!: string;

  @Column()
  units!: number;

  @Column()
  unitType!: string;

  @Column()
  unitCapacity!: number;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  serviceId?: string;

  @Column({ default: false })
  recurring!: boolean;

  @Column({ nullable: true })
  interval?: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['day', 'week', 'month', 'year'],
  })
  intervalUnit?: 'day' | 'week' | 'month' | 'year';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IEvent>) {
    Object.assign(this, partial);
  }
}
