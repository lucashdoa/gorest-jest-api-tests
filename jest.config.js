module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
  collectCoverageFrom: [
    'tests/**/*.js',
    '!tests/**/*.test.js'
  ]
};
