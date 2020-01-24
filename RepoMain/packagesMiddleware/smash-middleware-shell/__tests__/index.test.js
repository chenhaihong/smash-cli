const autoMockSmashLogger = require('smash-helper-logger');
const SmashShell = require('../lib');

jest.mock('smash-helper-logger');

const ctx = {};
const mockNext = jest.fn(() => {});
const commandsKnown = ['node -v', 'npm -v', 'node -v'];
const commandsUnknown = 'node-unknown-node -v';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('smash-middleware-shell', () => {
  it('should run well without anything', async (done) => {
    await SmashShell(ctx, {}, mockNext);
    expect(ctx).toEqual({}); // ctx not modified.
    expect(mockNext).toBeCalled();

    const instance = autoMockSmashLogger.mock.instances[0];
    expect(instance.info).toBeCalled();
    expect(instance.success).toBeCalled();

    done();
  });

  it('should run logger.error with unknown commonds', async (done) => {
    await SmashShell(ctx, { commands: commandsUnknown }, mockNext);
    expect(ctx).toEqual({});
    expect(mockNext).not.toBeCalled();

    const instance = autoMockSmashLogger.mock.instances[0];
    expect(instance.info).toBeCalled();
    expect(instance.error).toBeCalled();

    done();
  });

  it('should run well with known commonds', async (done) => {
    await SmashShell(ctx, { commands: commandsKnown }, mockNext);
    expect(ctx).toEqual({});
    expect(mockNext).toBeCalled();

    const instance = autoMockSmashLogger.mock.instances[0];
    expect(instance.info).toBeCalled();
    expect(instance.success).toBeCalled();

    done();
  });
});
