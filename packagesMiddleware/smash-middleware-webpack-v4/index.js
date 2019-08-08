module.exports = function smashMiddlewareWebpackV4(ctx, ymlConfig, next) {
  let {
    type = 'build', // 枚举类型: server watch build lib
  } = ymlConfig;

  const defaultConfig = require('./conf').getDefaultConfig(type);
  const customedConfig = require('./conf').getCustomedConfig(defaultConfig);
  const webpackConfig = { ...defaultConfig, ...customedConfig };

  switch (type) {
    case 'server':
      require('./lib/server')(webpackConfig);
      break;
    case 'watch':
      require('./lib/watch')(webpackConfig);
      break;
    case 'build':
    case 'lib':
      require('./lib/build')(webpackConfig);
      next && next();
      break;
    default:
      next && next();
  }
};
