/**
 * 样式处理配置
 */

const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(isProd = true) {
  return {
    module: {
      rules: [
        // ******************************************
        // Pure CSS\Less (without CSS modules)
        // ******************************************
        {
          resource: { test: /\.css$/i, exclude: /\.module\.css$/i },
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // hmr: process.env.NODE_ENV === 'development',
                hmr: !isProd,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: resolve(__dirname),
                },
              },
            },
          ],
        },
        {
          resource: { test: /\.less$/i, exclude: /\.module\.less$/i },
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: resolve(__dirname),
                },
              },
            },
            'less-loader',
          ],
        },
        // *********************
        // CSS modules
        // *********************
        {
          resource: { test: /\.module\.css$/i },
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // hmr: process.env.NODE_ENV === 'development',
                hmr: !isProd,
              },
            },
            {
              loader: 'css-loader',
              // options 配置文档
              // https://github.com/webpack-contrib/css-loader#options
              // 一篇 CSS module 入门文章
              // https://segmentfault.com/a/1190000014722978
              options: {
                modules: true, // 启用 CSS Modules
                url: false, // Disables url/image-set functions handling
                localsConvention: 'camelCase', // Class names will be camelized
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: resolve(__dirname),
                },
              },
            },
          ],
        },
        {
          resource: { test: /\.module\.less$/i },
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                url: false,
                localsConvention: 'camelCase',
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: resolve(__dirname),
                },
              },
            },
            'less-loader',
          ],
        },
      ],
    },

    // 剥离样式的插件
    plugins: [
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      // https://www.npmjs.com/package/mini-css-extract-plugin#minimal-example
      new MiniCssExtractPlugin({
        // 这里的处理原因：
        // mini-css-extract-plugin配合热更新时，每次update，虽然加载了正确的hot-update.json，
        // 但是，最终引入的css文件总是最初构建出来的那一个，导致热更新看起来是不生效的。
        // 通过这么处理，在开发模式上，不加入hash值，保证每次update都能拿到最新构建出来的样式文件。
        filename: `[name]${isProd ? '.[hash:6]' : ''}.css`,
        chunkFilename: `[id]${isProd ? '.[hash:6]' : ''}.css`,
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
    ],
  };
};
