import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminServicesDetailComponent } from './detail.component';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const categories = categoriesFactory();
const services = servicesFactory(1, { categoryId: categories[0].id });
const service = services[0];

const meta: Meta<NexanodeAdminServicesDetailComponent> = {
  component: NexanodeAdminServicesDetailComponent,
  title: 'NexanodeAdminServicesDetailComponent',
  parameters: {
    mockData: [
      {
        url: '/api/services',
        method: 'GET',
        status: 200,
        response: services,
        delay: 1000,
      },
      {
        url: '/api/services/categories',
        method: 'GET',
        status: 200,
        response: categories,
        delay: 1000,
      },
      {
        url: `/api/services/${service.id}`,
        method: 'GET',
        status: 200,
        response: service,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminServicesDetailComponent>;

export const Primary: Story = {
  args: {
    id: service.id,
  },
};

export const Loading: Story = {
  args: {
    id: service.id,
  },
  parameters: {
    mockData: [
      {
        url: '/api/services',
        method: 'GET',
        status: 200,
        response: services,
        delay: 999999,
      },
      {
        url: '/api/services/categories',
        method: 'GET',
        status: 200,
        response: categories,
        delay: 999999,
      },
      {
        url: `/api/services/${service.id}`,
        method: 'GET',
        status: 200,
        response: service,
        delay: 999999,
      },
    ],
  },
};

export const Error: Story = {
  args: {
    id: service.id,
  },
  parameters: {
    mockData: [
      {
        url: '/api/services',
        method: 'GET',
        status: 500,
        response: {},
      },
      {
        url: '/api/services/categories',
        method: 'GET',
        status: 400,
        response: {},
      },
      {
        url: `/api/services/${service.id}`,
        method: 'GET',
        status: 401,
        response: {},
      },
    ],
  },
};
