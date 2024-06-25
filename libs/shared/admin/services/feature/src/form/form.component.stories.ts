import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminServicesFormComponent } from './form.component';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const categories = categoriesFactory();
const services = servicesFactory(1, { categoryId: categories[0].id });
const service = services[0];

const meta: Meta<NexanodeAdminServicesFormComponent> = {
  component: NexanodeAdminServicesFormComponent,
  title: 'NexanodeAdminServicesFormComponent',
  parameters: {
    mockData: [
      {
        url: '/api/services/categories',
        method: 'GET',
        response: categories,
        status: 200,
      },
      {
        url: '/api/services',
        method: 'GET',
        response: services,
        status: 200,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminServicesFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Update: Story = {
  args: {
    id: service.id,
  },
  parameters: {
    mockData: [
      {
        url: `/api/services/${service.id}`,
        method: 'GET',
        response: service,
        status: 200,
      },
      {
        url: '/api/services/categories',
        method: 'GET',
        response: categories,
        status: 200,
      },
      {
        url: '/api/services',
        method: 'GET',
        response: services,
        status: 200,
      },
    ],
  },
};
