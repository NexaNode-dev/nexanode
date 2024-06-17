import { IBooking } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Booking implements IBooking {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column({ unique: true })
  reference!: string;

  @Column()
  eventId!: string;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled'] })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @Column({ nullable: true })
  userId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IBooking> = {}) {
    Object.assign(this, partial);
  }
}
