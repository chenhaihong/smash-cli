/**
 * 通用的webpack配置
 */

const { resolve } = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const constants = require('./constants');

let extractCSSPlugin = new ExtractTextWebpackPlugin({
  filename: '[name].[contenthash:hex:6].css',
  allChunks: true,
});

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
      path: resolve(process.cwd(), constants.outputDir),
      // `filename` provides a template for naming your bundles (remember to use `[name]`)
      filename: '[name].[hash:6].js',
      // `chunkFilename` provides a template for naming code-split bundles (optional)
      chunkFilename: '[name].[hash:6].js',
    },

    // 各种类型文件对应的loader，样式文件的loader跟extractCSSPlugin有关联
    // 决定了如何处理项目中的不同类型的模块。
    // https://webpack.docschina.org/configuration/module/
    module: {
      rules: [
        { resource: { test: /\.html$/ }, use: ['html-loader'] },
        { resource: { test: /\.json$/ }, use: ['json-loader'] },
        {
          resource: { test: /\.css$/ },
          use: extractCSSPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
        },
        {
          resource: { test: /\.less$/ },
          use: extractCSSPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader'],
          }),
        },
        {
          resource: {
            test: /\.js$/,
            exclude: [/(node_modules|bower_components)/, /\.test\.js$/],
          },
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [require.resolve('@babel/preset-env')],
              plugins: getAllStagePluginsOfBabel(),
            },
          },
        },
        {
          resource: {
            test: /\.jsx$/,
            exclude: [/(node_modules|bower_components)/],
          },
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                require.resolve('@babel/preset-env'),
                require.resolve('@babel/preset-react'),
              ],
              plugins: getAllStagePluginsOfBabel(),
            },
          },
        },
      ],
    },

    // 剥离样式的插件
    plugins: [extractCSSPlugin],

    // 模块的解析路径：从以下两个位置读取
    resolve: {
      modules: [resolve(__dirname, '../node_modules'), 'node_modules'],
    },

    // loader的解析路径：从以下两个位置读取
    resolveLoader: {
      modules: [resolve(__dirname, '../node_modules'), 'node_modules'],
    },
  };
};

/**
 * 获取babel stage0、1、2、3的所有插件
 */
function getAllStagePluginsOfBabel() {
  return [
    // Stage 0
    require.resolve('@babel/plugin-proposal-function-bind'),

    // Stage 1
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-logical-assignment-operators'),
    [
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      { loose: false },
    ],
    [
      require.resolve('@babel/plugin-proposal-pipeline-operator'),
      { proposal: 'minimal' },
    ],
    [
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      { loose: false },
    ],
    require.resolve('@babel/plugin-proposal-do-expressions'),

    // Stage 2
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    require.resolve('@babel/plugin-proposal-function-sent'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-numeric-separator'),
    require.resolve('@babel/plugin-proposal-throw-expressions'),

    // Stage 3
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-syntax-import-meta'),
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { loose: false },
    ],
    require.resolve('@babel/plugin-proposal-json-strings'),
  ];
}
