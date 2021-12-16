/** @type {import('ts-jest/lib/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec).+(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleFileExtensions: ['js'],
};
