'use strict';

const chalk = require('chalk');
const Logger = require('../lib');

jest.spyOn(console, 'log');

afterEach(() => {
  jest.clearAllMocks();
});

describe('smash-helper-logger', () => {
  it('should have specific type of properties', function() {
    const _logger = new Logger('smash');
    const properties = ['log', 'info', 'warn', 'error', 'success', 'fail'];
    expect.assertions(properties.length * 2);
    properties.forEach((item) => {
      expect(_logger).toHaveProperty(item);
      expect(typeof _logger[item]).toBe('function');
    });
  });

  it('should create a named-smash logger instance well without param name', function() {
    expect(new Logger().name).toBe('smash');
  });

  it('logger[method] should print well', () => {
    const _logger = new Logger('smash');
    _logger.log('Hello World');
    _logger.info('Hello World');
    _logger.warn('Hello World');
    _logger.error('Hello World');
    _logger.success('Hello World');
    _logger.fail('Hello World');

    expect(console.log.mock.calls.length).toBe(6);
    expect(console.log.mock.calls[0]).toEqual(['smash', chalk.blueBright('log'), 'Hello World']);
    expect(console.log.mock.calls[1]).toEqual(['smash', chalk.greenBright('info'), 'Hello World']);
    expect(console.log.mock.calls[2]).toEqual(['smash', chalk.yellowBright('warn'), 'Hello World']);
    expect(console.log.mock.calls[3]).toEqual(['smash', chalk.redBright('error'), 'Hello World']);
    expect(console.log.mock.calls[4]).toEqual(['smash', chalk.greenBright('success'), 'Hello World']);
    expect(console.log.mock.calls[5]).toEqual(['smash', chalk.redBright('fail'), 'Hello World']);
  });
});
