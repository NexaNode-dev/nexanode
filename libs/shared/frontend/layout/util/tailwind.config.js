const { join } = require('path');
const sharedTailwindConfig = require('../../../frontend/tailwind/util/preset/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/components/**/!(*.stories|*.spec|*.e2e).{ts,tsx,html}'),
  ],
};
