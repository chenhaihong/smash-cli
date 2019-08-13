jest.mock('smash-helper-logger');
const autoMockSmashLogger = require('smash-helper-logger');
const SmashCopy = require('../lib');

// autoMockSmashLogger instance
const mockInstance = autoMockSmashLogger.mock.instances[0];
const mockWarn = mockInstance.warn;
// mock next
const mockNext = jest.fn(() => {});

require('./setup-before-after-all');

beforeEach(() => {
  mockWarn.mockClear();
  mockNext.mockClear();
});

// params for SmashCopy
const ctx = {};
const filesNotFound = [
  // not-found files
  '/src/filesNotFound/not-found-file.txt -> /dist/not-found-file.txt',
];

describe('with not-found files', () => {
  it('should not copy', (done) => {
    SmashCopy(ctx, { files: filesNotFound }, mockNext);

    expect(mockWarn).toBeCalled();
    expect(mockWarn.mock.calls[0][0]).toBe('Path not found:');

    expect(mockNext).toBeCalled();
    done();
  });
});

describe('with not-found files and tplData', () => {
  it('should not copy', (done) => {
    SmashCopy(ctx, { files: filesNotFound, tplData: { name: 'erye' } }, mockNext);

    expect(mockWarn).toBeCalled();
    expect(mockWarn.mock.calls[0][0]).toBe('Path not found:');

    expect(mockNext).toBeCalled();
    done();
  });
});
