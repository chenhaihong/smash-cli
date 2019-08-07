const smash = require('../lib');

describe('smash-cli/index.js', () => {
  test('should have expected properties', () => {
    expect(smash).toHaveProperty('init');
    expect(smash).toHaveProperty('install');
    expect(smash).toHaveProperty('run');
  });

  test('should have specific-type properties', () => {
    expect(typeof smash.init).toBe('function');
    expect(typeof smash.install).toBe('function');
    expect(typeof smash.run).toBe('function');
  });
});
