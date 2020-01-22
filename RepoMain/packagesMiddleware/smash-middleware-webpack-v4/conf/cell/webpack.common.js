/**
 * 通用的webpack配置
 */

const { resolve } = require('path');
const constants = require('../constants');

module.exports = function() {
  return {
    // 提供 mode 配置选项，告知 webpack 使用相应环境的内置优化。
    // https://webpack.docschina.org/concepts/mode/
    mode: 'production',

    // webpack 可以监听文件变化，当它们修改后会重新编译。
    // 这个页面介绍了如何启用这个功能，以及当 watch 无法正常运行的时候你可以做的一些调整。
    // https://webpack.docschina.org/configuration/watch/
    watch: false,

    // 此选项控制是否生成，以及如何生成 source map
    // https://webpack.docschina.org/configuration/devtool/
    devtool: false,

    // 输出文件的地址、格式
    // output 位于对象最顶级键(key)，包括了一组选项，
    // 指示 webpack 如何去输出、以及在哪里输出
    // 你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。
    // https://webpack.docschina.org/configuration/output/
    output: {
      // `path` is the folder where Webpack will place your bundles
      path: constants.outputDir,
      // `filename` provides a template for naming your bundles (remember to use `[name]`)
      filename: '[name].[hash:6].js',
      // `chunkFilename` provides a template for naming code-split bundles (optional)
      chunkFilename: '[id].[hash:6].js',
    },

    // 各种类型文件对应的loader，样式文件的loader跟提取样式插件有关联
    // 决定了如何处理项目中的不同类型的模块。
    // https://webpack.docschina.org/configuration/module/
    module: {
      rules: [],
    },

    plugins: [],

    // 设置模块如何被解析
    // https://webpack.docschina.org/configuration/resolve/
    resolve: {
      extensions: ['.js', '.json', '.jsx', '.vue', '.less', '*'],
      // 模块的解析路径：从以下两个位置读取
      modules: [resolve(__dirname, '../node_modules'), 'node_modules'],
    },

    // loader的解析路径：从以下两个位置读取
    resolveLoader: {
      modules: [resolve(__dirname, '../node_modules'), 'node_modules'],
    },

    stats: {
      // copied from `'minimal'`
      // all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      // our additional options
      entrypoints: true,
      children: false,
      moduleTrace: true,
      errorDetails: true,
    },
  };
};
