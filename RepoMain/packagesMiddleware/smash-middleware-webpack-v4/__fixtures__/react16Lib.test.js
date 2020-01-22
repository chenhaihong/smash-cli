const { resolve } = require('path');
const smashMiddlewareWebpackV4 = require('../lib');

process.chdir(resolve(__dirname, 'react-16-lib'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    type: 'lib',
  },
  next: null,
};
smashMiddlewareWebpackV4(ctx, config, next);
