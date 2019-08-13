const shell = require('.');

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    commonds: ['mkdir test', 'dir', 'rd test'],
  },
  next() {
    console.log('[next] Hello next.');
  },
};

shell(ctx, config, next);
