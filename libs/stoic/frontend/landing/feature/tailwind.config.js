const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      height: {
        'screen-70': '70vh',
        '3/5': '60%',
      },
      minHeight: {
        'screen-70': '70vh',
      },
      fontFamily: {
        header: ['"Playfair Display"', 'serif'],
        body: ['Merriweather', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
