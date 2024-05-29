import { IOrganisationType } from '@nexanode/domain-interfaces';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganisationTypeDto
  implements Pick<IOrganisationType, 'name' | 'description'>
{
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;
}
