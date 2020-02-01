module.exports = smashMiddlewareWebpackV4;

function smashMiddlewareWebpackV4(ctx, ymlConfig, next) {
  let {
    type = 'build', // 枚举类型: server watch build lib
  } = ymlConfig;

  const conf = require('../conf');
  const defaultConfig = conf.getDefaultConfig(type);
  const customedConfig = conf.getCustomedConfig(defaultConfig);
  const webpackConfig = { ...defaultConfig, ...customedConfig };

  switch (type) {
    case 'dev-server':
      require('./devServer')(webpackConfig);
      break;
    case 'watch':
      require('./watch')(webpackConfig);
      break;
    case 'build':
    case 'lib':
      require('./build')(webpackConfig);
      next && next();
      break;
    default:
      next && next();
  }
}
