const shell = require('../lib');
const [ctx, config, next] = [
  null,
  {
    commands: ['cd __fixtures__', 'dir', 'node -v', 'cd ..', 'dir'],
  },
  null,
];

shell(ctx, config, next);
