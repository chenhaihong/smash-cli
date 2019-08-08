'use strict';

const chalk = require('chalk');
const logger = require('../lib');

jest.spyOn(console, 'log');

afterEach(() => {
  jest.clearAllMocks();
});

describe('smash-helper-logger', () => {
  it('should have properties', function() {
    const properties = ['log', 'info', 'warn', 'error', 'success', 'fail'];
    expect.assertions(properties.length);
    properties.forEach((item) => {
      expect(logger).toHaveProperty(item);
    });
  });

  it('logger.log should print well', () => {
    logger.log('Hello World');
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.blueBright('log'), 'Hello World']);
  });

  it('logger.info should print well', () => {
    logger.info('Hello World');
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.greenBright('info'), 'Hello World']);
  });

  it('logger.warn should print well', () => {
    logger.warn('Hello World');
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.yellowBright('warn'), 'Hello World']);
  });

  it('logger.error should print well', () => {
    logger.error('Hello World');
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.redBright('error'), 'Hello World']);
  });

  it('logger.success should print well', () => {
    logger.success('Hello World');
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.greenBright('success'), 'Hello World']);
  });

  it('logger.fail should print well', () => {
    logger.fail('Hello World');
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.redBright('fail'), 'Hello World']);
  });
});
