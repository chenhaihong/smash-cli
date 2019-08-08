const path = require('path');
const fse = require('fs-extra');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = {
  /**
   * 根据type获取对应的webpack配置
   */
  getDefaultConfig(type) {
    let defaultConfig;
    let common = require('./webpack.common'); // 通用配置
    let browserBuild = require('./webpack.browserBuild'); // web网页类型
    let browserServer = require('./webpack.browserServer'); // web网页类型，包含webpack-dev-server的配置
    let watch = require('./webpack.watch'); // web网页类型的监听模式
    let lib = require('./webpack.lib'); // （非web网页类型的）库

    switch (type) {
      case 'server':
        defaultConfig = merge(common(), browserBuild(), browserServer());
        break;
      case 'watch':
        defaultConfig = merge(common(), browserBuild(), watch());
        break;
      case 'build':
        defaultConfig = merge(common(), browserBuild());
        break;
      case 'lib':
        defaultConfig = merge(common(), lib());
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
