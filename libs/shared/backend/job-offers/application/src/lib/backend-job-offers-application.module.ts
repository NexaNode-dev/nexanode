import { Module } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { BackendJobOffersDataAccessModule } from '@nexanode/backend-job-offers-data-access ';

@Module({
  imports: [BackendJobOffersDataAccessModule],
  providers: [JobOffersService],
  exports: [JobOffersService],
})
export class BackendJobOffersApplicationModule {}
