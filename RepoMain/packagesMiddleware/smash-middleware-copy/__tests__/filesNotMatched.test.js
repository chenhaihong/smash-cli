jest.mock('smash-helper-logger');
const autoMockSmashLogger = require('smash-helper-logger');
const SmashCopy = require('../lib');

// autoMockSmashLogger instance
const mockInstance = autoMockSmashLogger.mock.instances[0];
const mockWarn = mockInstance.warn;
// mock next
const mockNext = jest.fn(() => {});

beforeEach(() => {
  mockNext.mockClear();
});

// params for SmashCopy
const ctx = {};
const filesNotMatched = '/src/lib/*.js /dist/lib';

describe('with not-matched files', () => {
  it('should not copy', (done) => {
    SmashCopy(ctx, { files: filesNotMatched }, mockNext);

    expect(mockWarn).toBeCalled();
    expect(mockWarn.mock.calls[0][0]).toBe('/-+>/ not matched:');

    expect(mockNext).toBeCalled();

    done();
  });
});
