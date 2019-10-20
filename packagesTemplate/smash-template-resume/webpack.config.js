module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    externals: {
      axios: 'axios',
      jquery: 'jQuery',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  };
};
