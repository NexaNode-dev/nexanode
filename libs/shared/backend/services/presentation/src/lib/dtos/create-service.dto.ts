import { IService } from '@nexanode/domain-interfaces';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto
  implements
    Pick<IService, 'name' | 'description' | 'summary' | 'price' | 'category'>
{
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  summary!: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
