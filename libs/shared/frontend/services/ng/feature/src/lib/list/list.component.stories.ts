import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeServicesListComponent } from './list.component';

import {
  categoriesFactory,
  servicesFactory,
} from '@nexanode/testing-data-mocks-utils';

const categories = categoriesFactory(2);
const servicesFirst = servicesFactory(3, { categoryId: categories[0].id });
const servicesSecond = servicesFactory(3, { categoryId: categories[1].id });
const services = [...servicesFirst, ...servicesSecond];

const meta: Meta<NexaNodeServicesListComponent> = {
  component: NexaNodeServicesListComponent,
  title: 'ServicesListComponent',
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
type Story = StoryObj<NexaNodeServicesListComponent>;

export const Primary: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Offerings',
  },
};
