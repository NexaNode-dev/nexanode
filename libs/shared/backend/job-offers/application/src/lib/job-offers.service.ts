import { Injectable } from '@nestjs/common';
import { JobOffersRepository } from '@nexanode/backend-job-offers-data-access ';
import {
  QueryParamsDto,
  transformQueryParamsToFindOptions,
} from '@nexanode/backend-query-params-util';
import { IJobOffer } from '@nexanode/domain-interfaces';

@Injectable()
export class JobOffersService {
  constructor(private readonly jobOffersRepository: JobOffersRepository) {}

  getJobOffers(queryParams: QueryParamsDto<IJobOffer>): Promise<IJobOffer[]> {
    const options = transformQueryParamsToFindOptions(queryParams);
    return this.jobOffersRepository.getJobOffers(options);
  }

  getJobOffer(queryParams: QueryParamsDto<IJobOffer>): Promise<IJobOffer> {
    const options = transformQueryParamsToFindOptions(queryParams);
    return this.jobOffersRepository.getJobOffer(options);
  }

  getJobOfferById(id: string): Promise<IJobOffer> {
    return this.jobOffersRepository.getJobOffer({ where: { id } });
  }

  createJobOffer(jobOffer: Partial<IJobOffer>): Promise<IJobOffer> {
    return this.jobOffersRepository.createJobOffer(jobOffer);
  }

  updateJobOffer(id: string, jobOffer: Partial<IJobOffer>): Promise<IJobOffer> {
    return this.jobOffersRepository.updateJobOffer(id, jobOffer);
  }

  deleteJobOffer(id: string): Promise<string> {
    return this.jobOffersRepository.deleteJobOffer(id);
  }
}
