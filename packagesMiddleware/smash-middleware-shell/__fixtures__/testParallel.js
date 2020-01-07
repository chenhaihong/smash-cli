const shell = require('../lib');
const [ctx, config, next] = [
  null,
  {
    parallel: true,
    commands: ['cd __fixtures__', 'node ./parallel/resident-1.js', 'node ./parallel/resident-2.js'],
  },
  null,
];

shell(ctx, config, next);
