const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = function() {
  return {
    plugins: [new VueLoaderPlugin()],
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
      ],
    },
  };
};
