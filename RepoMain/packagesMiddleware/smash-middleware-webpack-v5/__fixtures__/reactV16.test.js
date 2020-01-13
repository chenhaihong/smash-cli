const { resolve } = require('path');
const smashMiddlewareWebpackV5 = require('../lib');

process.chdir(resolve(__dirname, './reactV16'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    type: 'build',
    type: 'watch',
    type: 'dev-server',
  },
  next: null,
};

smashMiddlewareWebpackV5(ctx, config, next);
