import type { Meta, StoryObj } from '@storybook/angular';
import { EazyworkBannerComponent } from './banner.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<EazyworkBannerComponent> = {
  component: EazyworkBannerComponent,
  title: 'EazyworkBannerComponent',
};
export default meta;
type Story = StoryObj<EazyworkBannerComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/banner works!/gi)).toBeTruthy();
  },
};
