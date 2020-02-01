const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');

module.exports = {
  /**
   * 这是当前中间件使用的各个类型的默认webpack配置，
   * 根据type来获取对应的webpack配置
   */
  getDefaultConfig(type) {
    let defaultConfig = {},
      isProd = true;
    switch (type) {
      // 网页应用-dev模式
      case 'dev-server':
        isProd = false;
        defaultConfig = require('./webpack.devServer')(isProd);
        break;
      // 网页应用-watch模式
      case 'watch':
        isProd = false;
        defaultConfig = require('./webpack.watch')(isProd);
        break;
      // 网页应用-生产模式
      case 'build':
        defaultConfig = require('./webpack.build')(isProd);
        break;
      // 组件库
      case 'lib':
        defaultConfig = require('./webpack.lib')(isProd);
        break;
    }
    return defaultConfig;
  },

  /**
   * 获取用户自定义的配置
   */
  getCustomedConfig(defaultConfig) {
    const filePath = path.resolve(process.cwd(), './webpack.config.js');
    let config = {};
    if (fse.pathExistsSync(filePath) && fse.statSync(filePath).isFile()) {
      config = require(filePath);
      if (typeof config === 'function') {
        config = config({ webpack, defaultWebpackConfig: defaultConfig });
      }
    }
    return config;
  },
};
