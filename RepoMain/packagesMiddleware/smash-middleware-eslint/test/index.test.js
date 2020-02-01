const path = require('path');
const lint = require('..');

process.chdir(path.resolve(__dirname, './example'));

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    option: './ --ext .jsx,.js',
    // option: ['--init']
  },
  next() {
    console.log('[next] Hello next.');
  },
};

lint(ctx, config, next);
