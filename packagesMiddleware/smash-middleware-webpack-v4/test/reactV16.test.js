const path = require('path');
const smashMiddlewareWebpackV4 = require('..');

process.chdir(path.resolve(__dirname, './reactV16'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    type: 'server',
  },
  next: null,
};
smashMiddlewareWebpackV4(ctx, config, next);
