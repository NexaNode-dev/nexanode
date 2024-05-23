import { faker } from '@faker-js/faker';
import { OrganisationType } from './organisation-type.entity';

describe('OrganisationType', () => {
  it('should be defined', () => {
    expect(new OrganisationType({})).toBeDefined();
  });
  it('should have the required properties', () => {
    const organisationType = new OrganisationType({
      name: faker.company.name(),
    });
    expect(organisationType).toHaveProperty('id');
    expect(organisationType).toHaveProperty('name');
  });
});
