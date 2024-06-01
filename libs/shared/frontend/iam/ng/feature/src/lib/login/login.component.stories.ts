import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { LoginComponent } from './login.component';

import { within, expect, userEvent } from '@storybook/test';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { userFactory } from '@nexanode/testing-data-mocks-utils';
import { provideRouter } from '@angular/router';

const meta: Meta<LoginComponent> = {
  component: LoginComponent,
  title: 'LoginComponent',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideRouter([])],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    mockData: [
      {
        url: '/api/auth/login',
        method: 'POST',
        status: 201,
        response: { user: userFactory() },
      },
    ],
  },
};
export default meta;
type Story = StoryObj<LoginComponent>;

export const Primary: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Sign in',
  },
};

export const ValidateCredential: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Leave the credential field blank', async () => {
      const credential = await canvas.findByLabelText('Credential');
      await credential.focus();
      await credential.blur();
    });

    expect(
      await canvas.findByText('Credential is required'),
    ).toBeInTheDocument();
  },
};

export const ValidatePassword: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Leave the password field blank', async () => {
      const credential = await canvas.findByLabelText('Password');
      await credential.focus();
      await credential.blur();
    });

    expect(await canvas.findByText('Password is required')).toBeInTheDocument();
  },
};

export const LoginFlow: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Fill the credential field', async () => {
      const credential = await canvas.findByLabelText('Credential');
      await userEvent.type(credential, 'user@example.com');
    });
    await step('Fill the password field', async () => {
      const password = await canvas.findByLabelText('Password');
      await userEvent.type(password, 'password');
    });
    await step('Submit the form', async () => {
      const submit = await canvas.getByRole('button');
      await userEvent.click(submit);
    });
    expect(await canvas.findByText('You are logged in.')).toBeInTheDocument();
  },
};
