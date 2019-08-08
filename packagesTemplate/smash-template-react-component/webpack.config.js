module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    output: {
      ...defaultWebpackConfig.output,
      library: 'ReactOneStore',
      libraryTarget: 'umd',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    resolve: {
      ...defaultWebpackConfig.resolve,
      alias: {},
    },
  };
};
