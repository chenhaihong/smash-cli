/**
 * 通用的webpack配置
 */

const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const constants = require('./constants');

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
      chunkFilename: '[id].[hash:6].js',
    },

    // 各种类型文件对应的loader，样式文件的loader跟提取样式插件有关联
    // 决定了如何处理项目中的不同类型的模块。
    // https://webpack.docschina.org/configuration/module/
    module: {
      rules: [
        { resource: { test: /\.html$/ }, use: ['html-loader'] },
        { resource: { test: /\.json$/ }, use: ['json-loader'] },
        {
          resource: { test: /\.css$/ },
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
          ],
        },
        {
          resource: { test: /\.less$/ },
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
            'less-loader',
          ],
        },
        {
          resource: {
            test: /\.jsx?$/,
            exclude: [/(node_modules|bower_components)/, /\.test\.js$/],
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
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        // https://www.npmjs.com/package/mini-css-extract-plugin#minimal-example
        filename: '[name].[hash:6].css',
        chunkFilename: '[id].[hash:6].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
    ],

    // 设置模块如何被解析
    // https://webpack.docschina.org/configuration/resolve/
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '*'],
      // 模块的解析路径：从以下两个位置读取
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
 *
 * As of Babel v7, all the stage presets have been deprecated. Check the blog post for more information.
 * https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
 *
 * For upgrade instructions, see the README.
 * https://github.com/babel/babel/blob/master/packages/babel-preset-stage-0/README.md
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
      { loose: true },
    ],
    require.resolve('@babel/plugin-proposal-json-strings'),

    // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
    // 为什么会出现这个插件，以及为什么使用它？
    // 阅读：https://babeljs.io/docs/en/babel-plugin-transform-runtime#why
    require.resolve('@babel/plugin-transform-runtime'),
  ];
}
