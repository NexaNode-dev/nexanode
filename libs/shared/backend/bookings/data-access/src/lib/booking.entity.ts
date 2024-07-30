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

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  contactName?: string;

  @Column({ nullable: true })
  contactEmail?: string;

  @Column({ nullable: true })
  contactPhone?: string;

  @Column({ nullable: true })
  addressLine1?: string;

  @Column({ nullable: true })
  addressLine2?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column({ nullable: true })
  country?: string;

  @Column()
  units!: number;

  @Column({ type: 'text', nullable: true })
  notes?: string | undefined;

  @Column({ nullable: true })
  paymentId?: string | undefined;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IBooking> = {}) {
    Object.assign(this, partial);
  }
}
