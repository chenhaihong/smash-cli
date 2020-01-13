const programmaticSmash = require('../lib');

describe('programmatic api', () => {
  test('should have expected properties', () => {
    expect(programmaticSmash).toHaveProperty('init');
    expect(programmaticSmash).toHaveProperty('install');
    expect(programmaticSmash).toHaveProperty('run');
  });

  test('should have specific-type properties', () => {
    expect(typeof programmaticSmash.init).toBe('function');
    expect(typeof programmaticSmash.install).toBe('function');
    expect(typeof programmaticSmash.run).toBe('function');
  });
});
