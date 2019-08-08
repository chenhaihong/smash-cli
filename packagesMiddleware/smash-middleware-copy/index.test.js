const copy = require('.');

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    files: ['./*.js -> ./dist/glob', './test/a.js -> ./dist/b.js', './test -> ./dist/a'],
    tplData: {
      name: 'copy',
    },
  },
  next() {
    console.log('[next] Hello next.');
  },
};

copy(ctx, config, next);
