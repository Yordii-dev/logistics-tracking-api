module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@users/(.*)$': '<rootDir>/src/users/$1',
  },
};
