import { IEvent } from '@nexanode/domain-interfaces';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto
  implements
    Pick<
      IEvent,
      | 'name'
      | 'description'
      | 'from'
      | 'to'
      | 'location'
      | 'units'
      | 'unitType'
      | 'unitCapacity'
      | 'recurring'
      | 'interval'
      | 'intervalUnit'
    >
{
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  from!: Date;

  @IsOptional()
  @IsDate()
  to?: Date;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsNumber()
  units!: number;

  @IsNotEmpty()
  @IsString()
  unitType!: string;

  @IsNotEmpty()
  @IsNumber()
  unitCapacity!: number;

  @IsNotEmpty()
  @IsBoolean()
  recurring!: boolean;

  @IsOptional()
  @IsNumber()
  interval?: number;

  @IsOptional()
  @IsString()
  intervalUnit?: 'day' | 'week' | 'month' | 'year';
}
