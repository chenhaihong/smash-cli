jest.mock('smash-helper-logger');
const autoMockSmashLogger = require('smash-helper-logger');
const SmashCopy = require('../lib');

// mock logger
const mockInstance = autoMockSmashLogger.mock.instances[0];
const mockSuccess = mockInstance.success;
// mock next
const mockNext = jest.fn(() => {});

require('./setup-before-after-all');

beforeEach(() => {
  mockSuccess.mockClear();
  mockNext.mockClear();
});

// params for SmashCopy
const ctx = {};
const filesKnown = [
  // dirs
  '/src/filesKnown ------> /dist/filesKnown',
  // files
  '/src/filesKnown/b.js -> /dist/filesKnownJS/b.js',
];

describe('with known files', () => {
  it('should run well', (done) => {
    SmashCopy(ctx, { files: filesKnown }, mockNext);

    expect(mockSuccess).toBeCalled();
    expect(mockNext).toBeCalled();

    done();
  });
});

describe('with known files and tplData', () => {
  it('should run well', (done) => {
    SmashCopy(ctx, { files: filesKnown, tplData: { name: 'erye' } }, mockNext);

    expect(mockSuccess).toBeCalled();
    expect(mockNext).toBeCalled();

    done();
  });
});
