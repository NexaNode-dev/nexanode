import { Module } from '@nestjs/common';
import { JobOffersRepository } from './job-offers.repository';
import { JobOffer } from './job-offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([JobOffer])],
  providers: [JobOffersRepository],
  exports: [JobOffersRepository, TypeOrmModule],
})
export class BackendJobOffersDataAccessModule {}
