import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeAdminJobOffersDetailComponent } from './detail.component';
import { jobOffersFactory } from '@nexanode/testing-data-mocks-utils';

const jobOffers = jobOffersFactory();
const jobOffer = jobOffers[0];

const meta: Meta<NexanodeAdminJobOffersDetailComponent> = {
  component: NexanodeAdminJobOffersDetailComponent,
  title: 'NexanodeAdminJobOffersDetailComponent',
  parameters: {
    mockData: [
      {
        url: `api/job-offers/${jobOffer.id}`,
        method: 'GET',
        response: jobOffer,
        status: 200,
        delay: 1000,
      },
      {
        url: `api/job-offers`,
        method: 'GET',
        response: jobOffers,
        status: 200,
        delay: 1000,
      },
    ],
  },
  args: {
    id: jobOffer.id,
  },
};
export default meta;
type Story = StoryObj<NexanodeAdminJobOffersDetailComponent>;

export const Primary: Story = {
  args: { ...meta.args },
};
