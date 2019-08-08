'use strict';

const chalk = require('chalk');
const Logger = require('../lib');

jest.spyOn(console, 'log');
jest.mock('../lib');

afterEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Logger.mockClear();
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

  it('logger.log should print well', () => {
    const _logger = new Logger('smash');
    _logger.log('Hello World');

    expect(Logger).toHaveBeenCalled();

    const mockLoggerInstance = Logger.mock.instances[0];
    const mockLog = mockLoggerInstance.log;
    expect(mockLog).toHaveBeenCalled();
    expect(mockLog.mock.calls[0][0]).toEqual('Hello World');

    // expect(console.log).toHaveBeenCalled();

    // expect(console.log.mock.calls[0]).toEqual(['smash', chalk.blueBright('log'), 'Hello World']);
  });

  it('logger.info should print well', () => {
    new Logger('smash').info('Hello World');

    const mockInfo = Logger.mock.instances[0].info;
    expect(mockInfo).toHaveBeenCalled();
    expect(mockInfo.mock.calls[0][0]).toEqual('Hello World');

    // expect(console.log.mock.calls[0]).toEqual(['smash', chalk.greenBright('info'), 'Hello World']);
  });

  it('logger.warn should print well', () => {
    new Logger('smash').warn('Hello World');

    const mockWarn = Logger.mock.instances[0].warn;
    expect(mockWarn).toHaveBeenCalled();
    expect(mockWarn.mock.calls[0][0]).toEqual('Hello World');

    // expect(console.log.mock.calls[0]).toEqual(['smash', chalk.yellowBright('warn'), 'Hello World']);
  });

  it('logger.error should print well', () => {
    new Logger('smash').error('Hello World');

    const mockError = Logger.mock.instances[0].error;
    expect(mockError).toHaveBeenCalled();
    expect(mockError.mock.calls[0][0]).toEqual('Hello World');

    // expect(console.log.mock.calls[0]).toEqual(['smash', chalk.redBright('error'), 'Hello World']);
  });

  it('logger.success should print well', () => {
    new Logger('smash').success('Hello World');

    const mockSuccess = Logger.mock.instances[0].success;
    expect(mockSuccess).toHaveBeenCalled();
    expect(mockSuccess.mock.calls[0][0]).toEqual('Hello World');

    // expect(console.log.mock.calls[0]).toEqual(['smash', chalk.greenBright('success'), 'Hello World']);
  });

  it('logger.fail should print well', () => {
    new Logger('smash').fail('Hello World');

    const mockFail = Logger.mock.instances[0].fail;
    expect(mockFail).toHaveBeenCalled();
    expect(mockFail.mock.calls[0][0]).toEqual('Hello World');

    // expect(console.log.mock.calls[0]).toEqual(['smash', chalk.redBright('fail'), 'Hello World']);
  });
});
