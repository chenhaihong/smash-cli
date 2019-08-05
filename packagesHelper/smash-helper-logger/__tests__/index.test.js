'use strict';

const logger = require('../lib');

describe('smash-helper-logger', () => {
  it('should have properties', function() {
    const properties = ['log', 'info', 'warn', 'error', 'success', 'fail'];
    expect.assertions(properties.length);
    properties.forEach((item) => {
      expect(logger).toHaveProperty(item);
    });
  });

  test('logger.log should print to the console', () => {});
  test('logger.info should print to the console', () => {});
  test('logger.warn should print to the console', () => {});
  test('logger.error should print to the console', () => {});
  test('logger.success should print to the console', () => {});
  test('logger.fail should print to the console', () => {});
});
