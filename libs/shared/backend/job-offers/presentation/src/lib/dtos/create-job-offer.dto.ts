import { IJobOffer } from '@nexanode/domain-interfaces';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateJobOfferDto
  implements Omit<IJobOffer, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNotEmpty()
  @IsUUID()
  companyId!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsDecimal()
  salaryLow!: number;

  @IsOptional()
  @IsDecimal()
  salaryHigh?: number;

  @IsNotEmpty()
  @IsString()
  employmentType!: 'permanent' | 'contract' | 'internship' | 'temporary';

  @IsNotEmpty()
  @IsString()
  workTime!: 'full-time' | 'part-time';

  @IsOptional()
  @IsString()
  contractDuration?: string;

  @IsOptional()
  @IsNumber()
  hoursPerWeek?: number;

  @IsOptional()
  @IsString()
  benefits?: string;

  @IsNotEmpty()
  @IsString()
  jobLevel!: 'junior' | 'medior' | 'senior' | 'principal';

  @IsNotEmpty()
  @IsString()
  status!: 'open' | 'closed';

  @IsNotEmpty()
  @IsString()
  requirements!: string;
}
