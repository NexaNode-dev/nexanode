const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset,
  moduleNameMapper: {
    '^lit$':
      '<rootDir>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html$':
      '<rootDir>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-element$':
      '<rootDir>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit/decorators.js$':
      '<rootDir>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html/directives/unsafe-html.js$':
      '<rootDir>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
  }, };
