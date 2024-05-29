import { Module } from '@nestjs/common';
import { OrganisationsController } from './organisations.controller';
import { BackendOrganisationsApplicationModule } from '@nexanode/backend-organisations-application';

@Module({
  imports: [BackendOrganisationsApplicationModule],
  controllers: [OrganisationsController],
  providers: [],
  exports: [],
})
export class BackendOrganisationsPresentationModule {}
