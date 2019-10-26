const path = require('path');
const smashMiddlewareWebpackV4 = require('../lib');

process.chdir(path.resolve(__dirname, './vueV2'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    type: 'dev-server',
    type: 'build',
  },
  next: null,
};
smashMiddlewareWebpackV4(ctx, config, next);
