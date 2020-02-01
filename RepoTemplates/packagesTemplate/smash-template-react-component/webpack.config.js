module.exports = ({ webpack, defaultWebpackConfig }) => {
  return {
    output: {
      ...defaultWebpackConfig.output,
      library: 'ReactOneStore',
      libraryTarget: 'umd',
    },
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM',
      },
    },
    resolve: {
      ...defaultWebpackConfig.resolve,
      alias: {},
    },
  };
};
