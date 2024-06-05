import { ICategory } from '@nexanode/domain-interfaces';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto
  implements Pick<ICategory, 'name' | 'description'>
{
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
