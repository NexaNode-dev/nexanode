import { Injectable, NotFoundException } from '@nestjs/common';
import { Organisation } from './organisation.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganisationsRepository extends Repository<Organisation> {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationsRepository: Repository<Organisation>,
  ) {
    super(
      Organisation,
      organisationsRepository.manager,
      organisationsRepository.queryRunner,
    );
  }

  getOrganisations(
    options: FindManyOptions<Organisation> = {},
  ): Promise<Organisation[]> {
    return this.organisationsRepository.find(options);
  }

  async getOrganisation(
    options: FindOneOptions<Organisation> = {},
  ): Promise<Organisation> {
    const organisation = await this.organisationsRepository.findOne(options);
    if (!organisation) {
      throw new NotFoundException(
        `Organisation with options ${JSON.stringify(options)} not found`,
      );
    }
    return organisation;
  }

  createOrganisation(
    organisation: Partial<Organisation>,
  ): Promise<Organisation> {
    const newOrganisation = this.organisationsRepository.create(organisation);
    return this.organisationsRepository.save(newOrganisation);
  }

  async updateOrganisation(
    id: string,
    organisation: Partial<Organisation>,
  ): Promise<Organisation> {
    const existingOrganisation = await this.organisationsRepository.preload({
      id,
      ...organisation,
    });
    if (!existingOrganisation) {
      throw new NotFoundException(`Organisation #${id} not found`);
    }
    return this.organisationsRepository.save(existingOrganisation);
  }

  async deleteOrganisation(id: string): Promise<string> {
    const organisation = await this.getOrganisation({ where: { id } });
    await this.organisationsRepository.remove(organisation);
    return id;
  }
}
