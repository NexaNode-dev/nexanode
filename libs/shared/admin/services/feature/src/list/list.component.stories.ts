import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminServicesListComponent } from './list.component';

const services = servicesFactory();
const categories = categoriesFactory();

import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexanodeAdminServicesListComponent> = {
  component: NexanodeAdminServicesListComponent,
  title: 'NexanodeAdminServicesListComponent',
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
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminServicesListComponent>;

export const Primary: Story = {
  args: {},
};

export const Error: Story = {
  args: {},
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
        status: 404,
        response: {},
      },
    ],
  },
};

export const Loading: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/services',
        method: 'GET',
        delay: 99999999,
        response: {},
        status: 200,
      },
      {
        url: '/api/services/categories',
        method: 'GET',
        delay: 99999999,
        response: {},
        status: 200,
      },
    ],
  },
};
