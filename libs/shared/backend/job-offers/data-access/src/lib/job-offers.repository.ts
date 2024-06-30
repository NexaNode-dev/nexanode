import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { JobOffer } from './job-offer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobOffersRepository extends Repository<JobOffer> {
  constructor(
    @InjectRepository(JobOffer)
    private readonly jobOffersRepository: Repository<JobOffer>,
  ) {
    super(
      JobOffer,
      jobOffersRepository.manager,
      jobOffersRepository.queryRunner,
    );
  }

  getJobOffers(options: FindManyOptions<JobOffer> = {}): Promise<JobOffer[]> {
    return this.jobOffersRepository.find(options);
  }

  async getJobOffer(options: FindOneOptions<JobOffer>): Promise<JobOffer> {
    const jobOffer = await this.jobOffersRepository.findOne(options);
    if (!jobOffer) {
      throw new NotFoundException(
        `Job offer with options ${JSON.stringify(options)} not found`,
      );
    }
    return jobOffer;
  }

  createJobOffer(jobOffer: Partial<JobOffer>): Promise<JobOffer> {
    const newJobOffer = this.jobOffersRepository.create(jobOffer);
    return this.jobOffersRepository.save(newJobOffer);
  }

  async updateJobOffer(
    id: string,
    jobOffer: Partial<JobOffer>,
  ): Promise<JobOffer> {
    const updatedJobOffer = await this.jobOffersRepository.preload({
      id,
      ...jobOffer,
    });
    if (!updatedJobOffer) {
      throw new NotFoundException(`Job offer with id ${id} not found`);
    }
    return this.jobOffersRepository.save(updatedJobOffer);
  }

  async deleteJobOffer(id: string): Promise<string> {
    const jobOffer = await this.getJobOffer({ where: { id } });
    await this.jobOffersRepository.remove(jobOffer);
    return id;
  }
}
