import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminServicesCategoriesListComponent } from './categories-list.component';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const categories = categoriesFactory();
const services = servicesFactory();

const meta: Meta<NexanodeAdminServicesCategoriesListComponent> = {
  component: NexanodeAdminServicesCategoriesListComponent,
  title: 'NexanodeAdminServicesCategoriesListComponent',
  parameters: {
    mockData: [
      {
        url: '/api/services/categories',
        method: 'GET',
        response: categories,
        status: 200,
        delay: 1000,
      },
      {
        url: '/api/services',
        method: 'GET',
        response: services,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminServicesCategoriesListComponent>;

export const Primary: Story = {
  args: {},
};
