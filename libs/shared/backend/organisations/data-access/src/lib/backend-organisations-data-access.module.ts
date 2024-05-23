import { Module } from '@nestjs/common';
import { OrganisationsRepository } from './organisations.repository';
import { OrganisationTypesRepository } from './organisation-types.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisation } from './organisation.entity';
import { OrganisationType } from './organisation-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organisation, OrganisationType])],
  providers: [OrganisationsRepository, OrganisationTypesRepository],
  exports: [
    OrganisationsRepository,
    OrganisationTypesRepository,
    TypeOrmModule,
  ],
})
export class BackendOrganisationsDataAccessModule {}
