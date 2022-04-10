// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^(pages|components|constants|styles|utils|hooks)/(.*)':
      '<rootDir>/src/$1/$2',
    // icons: '<rootDir>/src/icons',
    icons: '<rootDir>/src/icons/test-icons',
  },
};

module.exports = createJestConfig(customJestConfig);
