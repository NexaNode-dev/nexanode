import { Config } from '@stencil/core';
// import { postcss } from '@stencil/postcss';
// import tailwindcss from 'tailwindcss';

export const config: Config = {
  namespace: 'frontend-layout-util',
  taskQueue: 'async',
  sourceMap: true,
  // plugins: [
  //   postcss({
  //     plugins: [
  //       tailwindcss('./tailwind.config.js'),
  //       require('autoprefixer'),
  //     ],
  //   }),
  // ],
  extras: {
    experimentalImportInjection: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
  ],
};
