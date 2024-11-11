/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.(test|spec).(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^~/(.+)': '<rootDir>/src/$1',
    '^./environmentConstants': '<rootDir>/__mocks__/environmentConstantsMock.ts',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/src/config/setupTests.ts'],
};
