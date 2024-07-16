import { IOrganisationType } from '@nexanode/domain-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { uuidv7 } from 'uuidv7';
import { Organisation } from './organisation.entity';

@Entity('organisation_types')
export class OrganisationType implements IOrganisationType {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToOne(() => Organisation)
  organisation!: Relation<Organisation>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<IOrganisationType>) {
    Object.assign(this, partial);
  }
}
