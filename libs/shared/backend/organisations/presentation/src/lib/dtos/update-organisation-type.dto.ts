import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganisationTypeDto } from './create-organisation-type.dto';

export class UpdateOrganisationTypeDto extends PartialType(
  CreateOrganisationTypeDto,
) {}
