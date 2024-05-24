import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OrganisationsService } from './organisations.service';
import {
  organisationTypesFactory,
  organisationsFactory,
} from '@nexanode/testing-data-mocks-utils';

describe('OrganisationsService', () => {
  let service: OrganisationsService;
  let httpController: HttpTestingController;

  const expectedOrganisations = organisationsFactory();

  const expectedOrganisation = expectedOrganisations[0];

  const expectedOrganisationTypes = organisationTypesFactory();

  const expectedOrganisationType = expectedOrganisationTypes[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrganisationsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get organisations', () => {
    service.getOrganisations().subscribe((organisations) => {
      expect(organisations).toEqual(expectedOrganisations);
    });

    const req = httpController.expectOne('api/organisations');
    expect(req.request.method).toBe('GET');
    req.flush(expectedOrganisations);
  });
  it('should get organisation', () => {
    service
      .getOrganisation(expectedOrganisation.id)
      .subscribe((organisation) => {
        expect(organisation).toEqual(expectedOrganisation);
      });

    const req = httpController.expectOne(
      `api/organisations/${expectedOrganisation.id}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(expectedOrganisation);
  });
  it('should create organisation', () => {
    service
      .createOrganisation(expectedOrganisation)
      .subscribe((organisation) => {
        expect(organisation).toEqual(expectedOrganisation);
      });

    const req = httpController.expectOne('api/organisations');
    expect(req.request.method).toBe('POST');
    req.flush(expectedOrganisation);
  });
  it('should update organisation', () => {
    service
      .updateOrganisation(expectedOrganisation)
      .subscribe((organisation) => {
        expect(organisation).toEqual(expectedOrganisation);
      });

    const req = httpController.expectOne(
      `api/organisations/${expectedOrganisation.id}`,
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedOrganisation);
  });
  it('should delete organisation', () => {
    service.deleteOrganisation(expectedOrganisation.id).subscribe();

    const req = httpController.expectOne(
      `api/organisations/${expectedOrganisation.id}`,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedOrganisation.id);
  });
  it('should get organisation types', () => {
    service.getOrganisationTypes().subscribe((organisationTypes) => {
      expect(organisationTypes).toEqual(expectedOrganisationTypes);
    });

    const req = httpController.expectOne('api/organisations/types');
    expect(req.request.method).toBe('GET');
    req.flush(expectedOrganisationTypes);
  });
  it('should get organisation type', () => {
    service
      .getOrganisationType(expectedOrganisationType.id)
      .subscribe((organisationType) => {
        expect(organisationType).toEqual(expectedOrganisationType);
      });

    const req = httpController.expectOne(
      `api/organisations/types/${expectedOrganisationType.id}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(expectedOrganisationType);
  });
  it('should create organisation type', () => {
    service
      .createOrganisationType(expectedOrganisationType)
      .subscribe((organisationType) => {
        expect(organisationType).toEqual(expectedOrganisationType);
      });

    const req = httpController.expectOne('api/organisations/types');
    expect(req.request.method).toBe('POST');
    req.flush(expectedOrganisationType);
  });
  it('should update organisation type', () => {
    service
      .updateOrganisationType(expectedOrganisationType)
      .subscribe((organisationType) => {
        expect(organisationType).toEqual(expectedOrganisationType);
      });

    const req = httpController.expectOne(
      `api/organisations/types/${expectedOrganisationType.id}`,
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(expectedOrganisationType);
  });
  it('should delete organisation type', () => {
    service.deleteOrganisationType(expectedOrganisationType.id).subscribe();

    const req = httpController.expectOne(
      `api/organisations/types/${expectedOrganisationType.id}`,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedOrganisationType.id);
  });
});
