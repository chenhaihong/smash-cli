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
      hot: true,
      // hotOnly: true, // 只启用页面无刷新替换
      port: 8080,
    },
  };
};
