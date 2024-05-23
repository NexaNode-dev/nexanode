/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import {
  OrganisationTypesRepository,
  OrganisationsRepository,
} from '@nexanode/backend-organisations-data-access';
import { IOrganisation, IOrganisationType } from '@nexanode/domain-interfaces';

@Injectable()
export class OrganisationsService {
  constructor(
    private readonly organisationsRepository: OrganisationsRepository,
    private readonly organisationTypesRepository: OrganisationTypesRepository,
  ) {}

  async getOrganisations(options?: any): Promise<IOrganisation[]> {
    return this.organisationsRepository.getOrganisations(options);
  }

  async getOrganisationTypes(options?: any): Promise<IOrganisationType[]> {
    return this.organisationTypesRepository.getOrganisationTypes(options);
  }

  async getOrganisation(options?: any): Promise<IOrganisation> {
    return this.organisationsRepository.getOrganisation(options);
  }

  async getOrganisationById(id: string): Promise<IOrganisation> {
    return this.organisationsRepository.getOrganisation({ where: { id } });
  }

  async getOrganisationType(options?: any): Promise<IOrganisationType> {
    return this.organisationTypesRepository.getOrganisationType(options);
  }

  async createOrganisation(
    organisation: Partial<IOrganisation>,
  ): Promise<IOrganisation> {
    return this.organisationsRepository.createOrganisation(organisation);
  }

  async createOrganisationType(
    organisationType: Partial<IOrganisationType>,
  ): Promise<IOrganisationType> {
    return this.organisationTypesRepository.createOrganisationType(
      organisationType,
    );
  }

  async updateOrganisation(
    id: string,
    organisation: Partial<IOrganisation>,
  ): Promise<IOrganisation> {
    return this.organisationsRepository.updateOrganisation(id, organisation);
  }

  async updateOrganisationType(
    id: string,
    organisationType: Partial<IOrganisationType>,
  ): Promise<IOrganisationType> {
    return this.organisationTypesRepository.updateOrganisationType(
      id,
      organisationType,
    );
  }

  async deleteOrganisation(id: string): Promise<string> {
    return this.organisationsRepository.deleteOrganisation(id);
  }

  async deleteOrganisationType(id: string): Promise<string> {
    return this.organisationTypesRepository.deleteOrganisationType(id);
  }
}
