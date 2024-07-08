import type { Meta, StoryObj } from '@storybook/angular';
import { NexanodeJobOffersDetailComponent } from './detail.component';
import { jobOfferFactory, organisationFactory } from '@nexanode/testing-data-mocks-utils';

const company = organisationFactory()
const jobOffer = jobOfferFactory({ companyId: company.id })

const meta: Meta<NexanodeJobOffersDetailComponent> = {
  component: NexanodeJobOffersDetailComponent,
  title: 'NexanodeJobOffersDetailComponent',
  parameters: {
    mockData: [
      {
        url: '/api/job-offers',
        method: 'GET',
        response: [jobOffer],
        status: 200,
      },
      {
        url: '/api/organisations',
        method: 'GET',
        response: [company],
        status: 200,
      },
      {
        url: `/api/job-offers/${jobOffer.id}`,
        method: 'GET',
        response: jobOffer,
        status: 200,
      },
      {
        url: `/api/organisations/${company.id}`,
        method: 'GET',
        response: company,
        status: 200,
      },
    ]
  },
  args: {
    id: jobOffer.id,
  },
};
export default meta;
type Story = StoryObj<NexanodeJobOffersDetailComponent>;

export const Primary: Story = {
  args: {},
};

