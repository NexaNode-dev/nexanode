import { IService } from '@nexanode/domain-interfaces';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto
  implements
    Pick<IService, 'name' | 'description' | 'summary' | 'price' | 'categoryId'>
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
  categoryId?: string;
}
