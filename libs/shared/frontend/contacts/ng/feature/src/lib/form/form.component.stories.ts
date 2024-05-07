import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { ContactFormComponent } from './form.component';

import { within, expect } from '@storybook/test';
import { provideHttpClient } from '@angular/common/http';
import { contactFactory } from '@nexanode/testing-data-mocks-utils';

const meta: Meta<ContactFormComponent> = {
  component: ContactFormComponent,
  title: 'ContactFormComponent',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  parameters: {
    mockData: [
      {
        url: '/api/contacts',
        method: 'POST',
        status: 201,
        response: contactFactory(),
      },
    ],
  },
};
export default meta;
type Story = StoryObj<ContactFormComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/form works!/gi)).toBeTruthy();
  },
};
