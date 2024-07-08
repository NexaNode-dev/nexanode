import { faker } from '@faker-js/faker';
import { IOrganisation, IOrganisationType } from '@nexanode/domain-interfaces';

export const organisationFactory = (
  options?: Partial<IOrganisation>,
): IOrganisation => {
  const organisation: IOrganisation = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    typeId: faker.string.uuid(),
  };

  return { ...organisation, ...options };
};

export const organisationsFactory = (
  count = 20,
  options?: Partial<IOrganisation>,
): IOrganisation[] => {
  return Array.from({ length: count }, () => organisationFactory(options));
};

export const organisationTypeFactory = (
  options?: Partial<IOrganisationType>,
): IOrganisationType => {
  const organisationType: IOrganisationType = {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  return { ...organisationType, ...options };
};

export const organisationTypesFactory = (
  count = 20,
  options?: Partial<IOrganisationType>,
): IOrganisationType[] => {
  return Array.from({ length: count }, () => organisationTypeFactory(options));
};
