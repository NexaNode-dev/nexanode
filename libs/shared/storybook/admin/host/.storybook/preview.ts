import { Preview, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient(withFetch())],
    }),
  ],
};

export default preview;
