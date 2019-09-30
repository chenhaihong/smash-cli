const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = resolve(__dirname, '../');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: resolve(ROOT, 'src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve(ROOT, 'dist'),
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(ROOT, 'src/assets/index.html'),
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
  module: {
    rules: [
      {
        resource: { test: /\.html$/ },
        use: [
          {
            loader: 'html-loader',
            // 选项的配置请阅读文档
            // https://www.npmjs.com/package/html-loader
            options: { attrs: ['img:src', ':data-background-image'] },
          },
        ],
      },
      { resource: { test: /\.json$/ }, use: ['json-loader'] },
      { resource: { test: /\.css$/ }, use: ['style-loader', 'css-loader'] },
      {
        resource: { test: /\.less$/ },
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        resource: {
          test: /\.(png|jpg|gif|ttf|woff|eot)$/,
        },
        use: [{ loader: 'file-loader', options: {} }],
      },
      {
        resource: {
          test: /\.js$/,
          include: [resolve(ROOT, 'src')],
        },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['@babel/preset-env', { modules: false }]],
            plugins: getAllStagePluginsOfBabel(),
          },
        },
      },
    ],
  },
  externals: {
    'reveal.js': 'Reveal',
  },
  devServer: {
    contentBase: resolve(ROOT, 'dist'),
    compress: true,
    index: 'index.html',
    open: true,
  },
};

function getAllStagePluginsOfBabel() {
  return [
    // Stage 0
    '@babel/plugin-proposal-function-bind',

    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
    '@babel/plugin-proposal-do-expressions',

    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',

    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
  ];
}
