const path = require('path');
const fse = require('fs-extra');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = {
  /**
   * 这是当前中间件使用的各个类型的默认webpack配置，
   * 根据type来获取对应的webpack配置
   */
  getDefaultConfig(type) {
    const _base = require('./webpack.base'); // 通用配置
    const _htmlEntry = require('./webpack.htmlEntry'); // web网页类型-生产模式
    const _devServer = require('./webpack.devServer'); // web网页类型-包含webpack-dev-server的配置
    const _watch = require('./webpack.watch'); // web网页类型-监听模式
    const _lib = require('./webpack.lib'); // 针对库类型应用的开发
    const _minify = require('./webpack.minify');

    let defaultConfig = {};
    switch (type) {
      case 'dev-server':
        defaultConfig = merge(_base(), _htmlEntry(), _devServer());
        break;
      case 'watch':
        defaultConfig = merge(_base(), _htmlEntry(), _watch());
        break;
      case 'build':
        defaultConfig = merge(_base(), _htmlEntry(), _minify());
        break;
      case 'lib':
        defaultConfig = merge(_base(), _lib(), _minify());
        break;
    }
    return defaultConfig;
  },

  /**
   * 获取用户自定义的配置
   */
  getCustomedConfig(defaultConfig) {
    const url = path.resolve(process.cwd(), './webpack.config.js');
    let config = {};
    if (fse.pathExistsSync(url)) {
      config = require(url);
      if (typeof config === 'function') {
        config = config({ webpack, defaultWebpackConfig: defaultConfig });
      }
    }
    return config;
  },
};
