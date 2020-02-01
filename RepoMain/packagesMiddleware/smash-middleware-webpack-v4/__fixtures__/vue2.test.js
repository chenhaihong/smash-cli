const path = require('path');
const smashMiddlewareWebpackV4 = require('../lib');

process.chdir(path.resolve(__dirname, './vue-2'));

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
