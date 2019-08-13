const SmashHelloWorld = require('../lib');

const ctx = {};
const config = {};
const next = () => {};

const spyLog = jest.spyOn(console, log);
const mockNext = jest.fn(next);

describe('SmashHelloWorld', () => {
  it('should run well', () => {
    SmashHelloWorld(ctx, config, next);

    expect(spyLog).toBeCalled();
    expect(spyLog.mock.calls[0][0]).toBe('Hello world');

    expect(mockNext.mock.calls[0]).toEqual([]);
  });
});
