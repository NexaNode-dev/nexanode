import { categoriesFactory, servicesFactory } from '@nexanode/testing-data-mocks-utils';
import { OneServicesLayout } from './one-layout';

const expectedServices = servicesFactory();
const expectedCategories = categoriesFactory();
const expectedServicesByCategory = expectedCategories.map((category) => ({
  category,
  services: expectedServices.filter(
    (service) => service.categoryId === category.id,
  ),
}));

describe('OneServicesLayout', () => {
  it('should render the component', () => {
    const element = new OneServicesLayout();
    expect(element).toBeTruthy();
  });
  it('should render the component with a title', () => {
    const element = new OneServicesLayout();
    element.title = 'One Layout';
    expect(element.title).toEqual('One Layout');
  });
  it('should render the component with services', () => {
    const element = new OneServicesLayout();
    element.services = expectedServices;
    expect(element.services).toEqual(expectedServices);
  });
  it('should render the component with categories', () => {
    const element = new OneServicesLayout();
    element.categories = expectedCategories;
    expect(element.categories).toEqual(expectedCategories);
  });
  it('should render the component with services by category', () => {
    const element = new OneServicesLayout();
    element.servicesByCategory = expectedServicesByCategory;
    expect(element.servicesByCategory).toEqual(expectedServicesByCategory);
  });
});