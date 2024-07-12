import { IJobOffer } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity('job_offers')
export class JobOffer implements IJobOffer {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column('uuid')
  companyId!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  location!: string;

  @Column('float')
  salaryLow!: number;

  @Column('float', { nullable: true })
  salaryHigh?: number;

  @Column({
    type: 'enum',
    enum: ['permanent', 'contract', 'temporary', 'internship'],
  })
  employmentType!: 'permanent' | 'contract' | 'temporary' | 'internship';

  @Column({ type: 'enum', enum: ['full-time', 'part-time'] })
  workTime!: 'full-time' | 'part-time';

  @Column({ nullable: true })
  contractDuration?: string;

  @Column({ nullable: true })
  hoursPerWeek?: number;

  @Column({ nullable: true, type: 'text' })
  benefits?: string;

  @Column({ type: 'enum', enum: ['junior', 'medior', 'senior', 'principal'] })
  jobLevel!: 'junior' | 'medior' | 'senior' | 'principal';

  @Column({ type: 'enum', enum: ['open', 'closed'] })
  status!: 'open' | 'closed';

  @Column('text')
  requirements!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IJobOffer>) {
    Object.assign(this, partial);
  }
}
