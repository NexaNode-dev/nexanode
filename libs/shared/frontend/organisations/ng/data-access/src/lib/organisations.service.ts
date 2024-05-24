import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrganisation, IOrganisationType } from '@nexanode/domain-interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrganisationsService {
  constructor(private readonly http: HttpClient) {}

  getOrganisations() {
    return this.http.get<IOrganisation[]>('api/organisations');
  }

  getOrganisation(id: string) {
    return this.http.get<IOrganisation>(`api/organisations/${id}`);
  }

  createOrganisation(organisation: Partial<IOrganisation>) {
    return this.http.post<IOrganisation>('api/organisations', organisation);
  }

  updateOrganisation(organisation: Partial<IOrganisation>) {
    return this.http.patch<IOrganisation>(
      `api/organisations/${organisation.id}`,
      organisation,
    );
  }

  deleteOrganisation(id: string) {
    return this.http.delete(`api/organisations/${id}`);
  }

  getOrganisationTypes() {
    return this.http.get<IOrganisationType[]>('api/organisations/types');
  }

  getOrganisationType(id: string) {
    return this.http.get<IOrganisationType>(`api/organisations/types/${id}`);
  }

  createOrganisationType(organisationType: Partial<IOrganisationType>) {
    return this.http.post<IOrganisationType>(
      'api/organisations/types',
      organisationType,
    );
  }

  updateOrganisationType(organisationType: Partial<IOrganisationType>) {
    return this.http.patch<IOrganisationType>(
      `api/organisations/types/${organisationType.id}`,
      organisationType,
    );
  }

  deleteOrganisationType(id: string) {
    return this.http.delete(`api/organisations/types/${id}`);
  }
}
