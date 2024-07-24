const nxPreset = require('@nx/jest/preset').default;

module.exports = { ...nxPreset,
  moduleNameMapper: {
    '^lit$':
      '<projectRoot>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html$':
      '<projectRoot>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-element$':
      '<projectRoot>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit/decorators.js$':
      '<projectRoot>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html/directives/unsafe-html.js$':
      '<projectRoot>/libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
  }, };
