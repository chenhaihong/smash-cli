module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    devtool: 'source-map',
    externals: {
      axios: 'axios',
      jquery: 'jQuery',
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
      // hotOnly: false, // 不启用页面无刷新替换
      // port: 8080,
    },
  };
};
