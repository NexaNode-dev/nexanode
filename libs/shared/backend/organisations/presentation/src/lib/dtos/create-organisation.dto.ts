import { IOrganisation } from '@nexanode/domain-interfaces';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrganisationDto
  implements
    Pick<
      IOrganisation,
      'name' | 'description' | 'typeId' | 'registrationNumber'
    >
{
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsString()
  @IsNotEmpty()
  typeId!: string;

  @IsOptional()
  @IsString()
  registrationNumber?: string;
}
