/**
 * 通用的webpack配置
 */

const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const constants = require('./constants');

let extractCSSPlugin = new ExtractTextWebpackPlugin({
  filename: '[name].[contenthash:hex:6].css',
  allChunks: true,
});

module.exports = () => {
  return {
    mode: 'production',
    watch: false,
    devtool: false,
    output: getOutput(), // 输出的文件地址、格式
    module: getModule(), // 各种类型文件对应的loader，样式文件的loader包含extractCSSPlugin
    plugins: [extractCSSPlugin], // 剥离样式的插件
    resolve: getResolve(), // 模块的解析路径
    resolveLoader: getResolveLoader(), // loader的解析路径
  };
};

/**
 * 输出的文件地址、格式
 */
function getOutput() {
  return {
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(process.cwd(), constants.outputDir),
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].[hash:6].js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].[hash:6].js',
  };
}

/**
 * 各种类型文件对应的loader，样式文件的loader跟extractCSSPlugin有关联
 */
function getModule() {
  return {
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
            presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
            plugins: getAllStagePluginsOfBabel(),
          },
        },
      },
    ],
  };
}

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
    [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: false }],
    [require.resolve('@babel/plugin-proposal-pipeline-operator'), { proposal: 'minimal' }],
    [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), { loose: false }],
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
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
    require.resolve('@babel/plugin-proposal-json-strings'),
  ];
}

/**
 * 模块的解析路径：从以下两个位置读取
 */
function getResolve() {
  return {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
  };
}

/**
 * loader的解析路径：从以下两个位置读取
 */
function getResolveLoader() {
  return {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
  };
}
