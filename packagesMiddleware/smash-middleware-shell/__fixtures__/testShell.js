const shell = require('../lib');
const [ctx, config, next] = [
  null,
  {
    commands: ['cd __fixtures__', "echo 'hello world' >test123.go", 'node -v'],
  },
  null,
];

shell(ctx, config, next);
