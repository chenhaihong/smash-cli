/**
 * 这个配置用于压缩文件
 */

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    devtool: 'none', // 生产模式下，不生成source map
    optimization: {
      minimize: true,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
  };
};
