const { resolve } = require('path');
const SmashJest = require('../lib');

const FIXTURE = resolve(__dirname, '../__fixtures__');

const ctx = Object.create(null);
const config = {
  options: './test --coverage',
};
const mockNext = jest.fn(() => {});

describe('smash-middleware-jest', () => {
  it('sholule run well without any test files', async (done) => {
    await SmashJest(ctx, config, mockNext);

    done();
  });

  it('sholule run well with test files', async (done) => {
    await SmashJest(ctx, config, mockNext);

    done();
  });
});
