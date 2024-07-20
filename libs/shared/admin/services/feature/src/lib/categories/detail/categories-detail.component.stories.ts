import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminServicesCategoriesDetailComponent } from './categories-detail.component';

const categories = categoriesFactory();
const services = servicesFactory();
const category = categories[0];

import { within } from '@storybook/test';
import { expect } from '@storybook/test';
import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const meta: Meta<NexanodeAdminServicesCategoriesDetailComponent> = {
  component: NexanodeAdminServicesCategoriesDetailComponent,
  title: 'NexanodeAdminServicesCategoriesDetailComponent',
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
      {
        url: `/api/services/categories/${category.id}`,
        method: 'GET',
        response: category,
        status: 200,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminServicesCategoriesDetailComponent>;

export const Primary: Story = {
  args: {
    id: category.id,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/categories-detail works!/gi)).toBeTruthy();
  },
};
