module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    devtool: 'source-map',
    externals: {
      vue: 'Vue',
    },
    resolve: {
      ...defaultWebpackConfig.resolve,
      alias: {},
    },
    devServer: {
      ...defaultWebpackConfig.devServer,
      // hot: false,
      // hotOnly: false, // 不启用页面无刷新替换
      // port: 8080,
    },
  };
};
