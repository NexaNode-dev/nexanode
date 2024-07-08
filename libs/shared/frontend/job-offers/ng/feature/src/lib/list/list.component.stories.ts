import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeJobOffersListComponent } from './list.component';
import {
  jobOffersFactory,
  organisationsFactory,
} from '@nexanode/testing-data-mocks-utils';
import { faker } from '@faker-js/faker';

const number = faker.number.int({ min: 5, max: 10 });
const companies = organisationsFactory(number);
const jobOffers = jobOffersFactory(
  number,
  Array.from({ length: number }, (_, i) => ({
    companyId: companies[i].id,
  })),
);

const meta: Meta<NexanodeJobOffersListComponent> = {
  component: NexanodeJobOffersListComponent,
  title: 'NexanodeJobOffersListComponent',
  parameters: {
    mockData: [
      {
        url: '/api/job-offers',
        method: 'GET',
        status: 200,
        response: jobOffers,
        delay: 1000,
      },
      {
        url: '/api/organisations',
        method: 'GET',
        status: 200,
        response: companies,
        delay: 1000,
      },
    ],
  },
};
export default meta;
type Story = StoryObj<NexanodeJobOffersListComponent>;

export const Primary: Story = {
  args: {},
};
