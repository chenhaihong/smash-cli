const { resolve } = require('path');
const smashMiddlewareWebpackV4 = require('../lib');

process.chdir(resolve(__dirname, 'react-16'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    type: 'build',
    type: 'watch',
    type: 'dev-server',
  },
  next: null,
};

smashMiddlewareWebpackV4(ctx, config, next);
