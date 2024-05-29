import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ListComponent } from './list.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<ListComponent> = {
  component: ListComponent,
  title: 'ListComponent',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ListComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list works!/gi)).toBeTruthy();
  },
};
