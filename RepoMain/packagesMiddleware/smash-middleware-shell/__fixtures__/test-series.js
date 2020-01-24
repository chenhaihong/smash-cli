const shell = require('../lib');
const [ctx, config, next] = [
  null,
  {
    commands: ['dir', 'node -v', 'cd ..', 'dir'],
  },
  null,
];

shell(ctx, config, next);
