const path = require('path');
const smashMiddlewareWebpackV4 = require('../lib');

process.chdir(path.resolve(__dirname, './reactLib'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    type: 'lib',
  },
  next: null,
};
smashMiddlewareWebpackV4(ctx, config, next);
