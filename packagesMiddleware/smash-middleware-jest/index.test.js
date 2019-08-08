const middleware = require('.');

const { ctx, config, next } = {
  ctx: Object.create(null),
  config: {
    options: './test --coverage',
  },
  next() {},
};

middleware(ctx, config, next);
