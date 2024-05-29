import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { BackendOrganisationsDataAccessModule } from '@nexanode/backend-organisations-data-access';

@Module({
  imports: [BackendOrganisationsDataAccessModule],
  providers: [OrganisationsService],
  exports: [OrganisationsService],
})
export class BackendOrganisationsApplicationModule {}
