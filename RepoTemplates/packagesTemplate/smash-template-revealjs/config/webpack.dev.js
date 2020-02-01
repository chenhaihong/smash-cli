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
            presets: ['module:smash-helper-babel-preset-react'],
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
