/**
 * 这个配置用于压缩文件
 */

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    devtool: 'none', // 生产模式下，不生成source map
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
          },
        },
        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true,
      },
      minimize: true,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
  };
};
