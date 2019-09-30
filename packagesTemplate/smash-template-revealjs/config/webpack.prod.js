const { resolve } = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const ROOT = resolve(__dirname, '../');

module.exports = {
  mode: 'production',
  // devtool: 'none',
  entry: {
    index: resolve(ROOT, 'src/index.js'),
  },
  output: {
    filename: '[name].[hash:6].js',
    path: resolve(ROOT, 'dist'),
    chunkFilename: '[name].[hash:6].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin([
      {
        from: resolve(ROOT, 'src/assets/images'),
        to: resolve(ROOT, 'dist/images'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css',
      chunkFilename: '[id].[hash:6].css',
    }),
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
            options: { attrs: false },
          },
        ],
      },
      { resource: { test: /\.json$/ }, use: ['json-loader'] },
      {
        resource: { test: /\.css$/ },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
      {
        resource: { test: /\.less$/ },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
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
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },
  externals: {
    'reveal.js': 'Reveal',
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
