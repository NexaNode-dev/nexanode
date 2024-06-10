/* eslint-disable */
export default {
  displayName: 'frontend-services-ng-feature',
  preset: '../../../../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory:
    '../../../../../../coverage/libs/shared/frontend/services/ng/feature',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  moduleNameMapper: {
    '^lit$':
      '<rootDir>/../../../../../../libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html$':
      '<rootDir>/../../../../../../libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-element$':
      '<rootDir>/../../../../../../libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit/decorators.js$':
      '<rootDir>/../../../../../../libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
    '^lit-html/directives/unsafe-html.js$':
      '<rootDir>/../../../../../../libs/shared/testing/lit-mocks/utils/src/lib/lit-element-mock.ts',
  },
};
