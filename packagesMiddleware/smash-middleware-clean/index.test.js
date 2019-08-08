const shell = require('.');

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    dirs: [' ', 'dist', './dist', '/dist', '\\dist'],
  },
  next() {
    console.log('[next] Hello next.');
  },
};

shell(ctx, config, next);
