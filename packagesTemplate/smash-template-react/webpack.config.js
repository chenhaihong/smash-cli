module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    devtool: 'source-map',
    externals: {
      axios: 'axios',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    resolve: {
      ...defaultWebpackConfig.resolve,
      alias: {},
    },
    devServer: {
      ...defaultWebpackConfig.devServer,
      // hot: false, // 不启用自动刷新
      // hotOnly: false, // 不启用页面无刷新替换
      port: 8080,
    },
  };
};
