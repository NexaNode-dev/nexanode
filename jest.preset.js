const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset,
  moduleNameMapper: {
    '^lit$':
      'libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html$':
      'libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-element$':
      'libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit/decorators.js$':
      'libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html/directives/unsafe-html.js$':
      '/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
  }, };
