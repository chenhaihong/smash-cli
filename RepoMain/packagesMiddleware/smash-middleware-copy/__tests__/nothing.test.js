const SmashCopy = require('../lib');

// mock next
const mockNext = jest.fn(() => {});

// params for SmashCopy
const ctx = {};

beforeEach(() => {
  mockNext.mockClear();
});

describe('without any files', () => {
  it('should run well without any files', (done) => {
    SmashCopy(ctx, {}, mockNext);

    expect(mockNext).toBeCalled();

    done();
  });
});
