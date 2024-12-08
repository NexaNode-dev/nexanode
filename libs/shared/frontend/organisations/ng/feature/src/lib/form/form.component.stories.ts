import {
  applicationConfig,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { FormComponent } from './form.component';

import { within, expect, userEvent } from '@storybook/test';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStoreDevtools } from '@ngrx/store-devtools';

const meta: Meta<FormComponent> = {
  component: FormComponent,
  title: 'FormComponent',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(withFetch()), provideStoreDevtools()],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  parameters: {
    mockData: [
      {
        url: '/api/organisations/types',
        method: 'GET',
        status: 200,
        response: [
          { id: 1, name: 'Company' },
          { id: 2, name: 'Sports Club' },
        ],
      },
      {
        url: '/api/organisations',
        method: 'POST',
        status: 201,
        response: { id: '1', name: 'Organisation Name' },
        delay: 1000,
      },
      {
        url: '/api/organisations/1',
        method: 'GET',
        status: 200,
        response: {
          id: '1',
          name: 'Organisation Name',
          typeId: 1,
          registrationNumber: '12345678',
        },
      },
    ],
  },
};
export default meta;
type Story = StoryObj<FormComponent>;

export const Primary: Story = {
  args: {},
};

export const Update: Story = {
  args: {
    id: '1',
  },
};

export const ValidateName: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave name empty', async () => {
      const name = canvas.getByLabelText('Name');
      name.focus();
      name.blur();
    });
    expect(canvas.getByText('Name is required')).toBeTruthy();
  },
};

export const ValidateType: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave type empty', async () => {
      const type = canvas.getByLabelText('Type');
      type.focus();
      type.blur();
    });
    expect(canvas.getByText('Type is required')).toBeTruthy();
  },
};

export const ValidateRegistrationNumberRequired: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave registration number empty', async () => {
      const regno = canvas.getByLabelText('Registration Number', {
        exact: true,
      });
      regno.focus();
      regno.blur();
    });
    expect(canvas.getByText('Registration Number is required')).toBeTruthy();
  },
};

export const ValidateRegistrationNumberInvalid: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Input invalid registration number', async () => {
      const regno = canvas.getByLabelText('Registration Number', {
        exact: true,
      });
      regno.focus();
      await userEvent.type(regno, '12345678');
      regno.blur();
    });
    expect(canvas.getByText('Registration Number is invalid')).toBeTruthy();
  },
};

export const ValidateEmailRequired: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave email empty', async () => {
      const email = canvas.getByLabelText('Email', {
        exact: true,
      });
      email.focus();
      email.blur();
    });
    expect(canvas.getByText('Email is required')).toBeTruthy();
  },
};

export const ValidateEmailInvalid: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Input invalid email', async () => {
      const email = canvas.getByLabelText('Email', {
        exact: true,
      });
      email.focus();
      await userEvent.type(email, 'invalid-email');
      email.blur();
    });
    expect(canvas.getByText('Email is invalid')).toBeTruthy();
  },
};

export const ValidatePhoneNumber: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    step('Leave registration number empty', async () => {
      const phone = canvas.getByLabelText('Phone', {
        exact: true,
      });
      phone.focus();
      phone.blur();
    });
    expect(canvas.getByText('Phone is required')).toBeTruthy();
  },
};

export const CreateOrganisation: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Fill in the form', async () => {
      const name = canvas.getByLabelText('Name');
      await userEvent.type(name, 'Organisation Name');
      const type = canvas.getByLabelText('Type');
      await userEvent.selectOptions(type, '1');
      const regno = canvas.getByLabelText('Registration Number', {
        exact: true,
      });
      await userEvent.type(regno, '69599084');
      const email = canvas.getByLabelText('Email', {
        exact: true,
      });
      await userEvent.type(email, 'test@example.com');
      const phone = canvas.getByLabelText('Phone', {
        exact: true,
      });
      await userEvent.type(phone, '1234567890');
      const description = canvas.getByLabelText('Description', {
        exact: true,
      });
      await userEvent.type(description, 'This is a test organisation');
    });
    await step('Submit the form', async () => {
      const submit = canvas.getByRole('button');
      await userEvent.click(submit);
    });
  },
};
