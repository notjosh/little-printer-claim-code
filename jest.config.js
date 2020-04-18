module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/__data__/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
};
