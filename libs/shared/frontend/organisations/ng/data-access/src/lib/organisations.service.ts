import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  checkRegistrationCode(code: string) {
    const headers = new HttpHeaders()
      .set('apikey', 'l7xx1f2691f2520d487b902f4e0b57a0b197')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      .set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With',
      );
    return this.http.get(
      `https://api.kvk.nl/test/api/v2/zoeken?kvkNummer=${code}`,
      { headers },
    );
  }
}
