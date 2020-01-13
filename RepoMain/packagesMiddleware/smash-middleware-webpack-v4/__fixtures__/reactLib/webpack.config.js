module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      store: 'store',
    },
  };
};
