import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminServicesCategoriesFormComponent } from './categories-form.component';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const categories = categoriesFactory();
const category = categories[0];
const services = servicesFactory();

const meta: Meta<NexanodeAdminServicesCategoriesFormComponent> = {
  component: NexanodeAdminServicesCategoriesFormComponent,
  title: 'NexanodeAdminServicesCategoriesFormComponent',
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
        url: `/api/services/categories/${category.id}`,
        method: 'GET',
        response: category,
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
type Story = StoryObj<NexanodeAdminServicesCategoriesFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Update: Story = {
  args: {
    id: category.id,
  },
};
