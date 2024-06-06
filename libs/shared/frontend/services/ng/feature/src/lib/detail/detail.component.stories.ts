import type { Meta, StoryObj } from '@storybook/angular';
import { NexaNodeServicesDetailComponent } from './detail.component';

import { within, expect } from '@storybook/test';
import { categoriesFactory, serviceFactory } from '@nexanode/testing-data-mocks-utils';

const service = serviceFactory();

const categories = categoriesFactory(1, { id: service.categoryId });

const meta: Meta<NexaNodeServicesDetailComponent> = {
  component: NexaNodeServicesDetailComponent,
  title: 'ServicesDetailComponent',
  args: {
    id: service.id,
  },
  parameters: {
    mockData: [
      {
        url: '/api/services',
        method: 'GET',
        status: 200,
        response: [service],
        delay: 1000,
      },
      {
        url: `/api/services/${service.id}`,
        method: 'GET',
        status: 200,
        response: service,
        delay: 1000,
      },
      {
        url: '/api/services/categories',
        method: 'GET',
        status: 200,
        response: categories,
        delay: 1000,
      }
    ],
  },
};
export default meta;
type Story = StoryObj<NexaNodeServicesDetailComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/detail works!/gi)).toBeTruthy();
  },
};
