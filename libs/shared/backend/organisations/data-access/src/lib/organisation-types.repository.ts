import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganisationType } from './organisation-type.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganisationTypesRepository extends Repository<OrganisationType> {
  constructor(
    @InjectRepository(OrganisationType)
    private readonly organisationTypesRepository: Repository<OrganisationType>,
  ) {
    super(
      OrganisationType,
      organisationTypesRepository.manager,
      organisationTypesRepository.queryRunner,
    );
  }

  getOrganisationTypes(
    options: FindManyOptions<OrganisationType> = {},
  ): Promise<OrganisationType[]> {
    return this.organisationTypesRepository.find(options);
  }

  async getOrganisationType(
    options: FindOneOptions<OrganisationType>,
  ): Promise<OrganisationType> {
    const organisationType =
      await this.organisationTypesRepository.findOne(options);
    if (!organisationType) {
      throw new NotFoundException(
        `OrganisationType with options ${JSON.stringify(options)} not found`,
      );
    }
    return organisationType;
  }

  createOrganisationType(
    organisationType: Partial<OrganisationType>,
  ): Promise<OrganisationType> {
    const newOrganisationType =
      this.organisationTypesRepository.create(organisationType);
    return this.organisationTypesRepository.save(newOrganisationType);
  }

  async updateOrganisationType(
    id: string,
    organisationType: Partial<OrganisationType>,
  ): Promise<OrganisationType> {
    const existingOrganisationType =
      await this.organisationTypesRepository.preload({
        id,
        ...organisationType,
      });
    if (!existingOrganisationType) {
      throw new NotFoundException(`OrganisationType #${id} not found`);
    }
    return this.organisationTypesRepository.save(existingOrganisationType);
  }

  async deleteOrganisationType(id: string): Promise<string> {
    const organisationType = await this.getOrganisationType({ where: { id } });
    await this.organisationTypesRepository.remove(organisationType);
    return id;
  }
}
