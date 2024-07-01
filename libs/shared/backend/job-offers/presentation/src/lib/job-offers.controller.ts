import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JobOffersService } from '@nexanode/backend-job-offers-application';
import { QueryParamsDto } from '@nexanode/backend-query-params-util';
import { Rbac } from '@nexanode/backend-rbac-util';
import { IJobOffer } from '@nexanode/domain-interfaces';
import { CreateJobOfferDto } from './dtos/create-job-offer.dto';
import { UpdateJobOfferDto } from './dtos/update-job-offer.dto';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Rbac({ action: 'read', subject: 'JobOffer' })
  @Get()
  async getJobOffers(
    @Query() queryParams: QueryParamsDto<IJobOffer>,
  ): Promise<IJobOffer[]> {
    return this.jobOffersService.getJobOffers(queryParams);
  }

  @Rbac({ action: 'read', subject: 'JobOffer' })
  @Get(':id')
  async getJobOfferById(@Param('id') id: string): Promise<IJobOffer> {
    return this.jobOffersService.getJobOfferById(id);
  }

  @Rbac({ action: 'create', subject: 'JobOffer' })
  @Post()
  async createJobOffer(
    @Body() createJobOfferDto: CreateJobOfferDto,
  ): Promise<IJobOffer> {
    return this.jobOffersService.createJobOffer(createJobOfferDto);
  }

  @Rbac({ action: 'update', subject: 'JobOffer' })
  @Patch(':id')
  async updateJobOffer(
    @Param('id') id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<IJobOffer> {
    return this.jobOffersService.updateJobOffer(id, updateJobOfferDto);
  }

  @Rbac({ action: 'delete', subject: 'JobOffer' })
  @Patch(':id/delete')
  async deleteJobOffer(@Param('id') id: string): Promise<string> {
    return this.jobOffersService.deleteJobOffer(id);
  }
}
