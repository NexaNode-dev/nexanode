import { Module } from '@nestjs/common';
import { JobOffersController } from './job-offers.controller';
import { BackendJobOffersApplicationModule } from '@nexanode/backend-job-offers-application';

@Module({
  imports: [BackendJobOffersApplicationModule],
  controllers: [JobOffersController],
  providers: [],
  exports: [],
})
export class BackendJobOffersPresentationModule {}
