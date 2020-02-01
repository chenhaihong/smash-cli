/**
 * react jsx 处理配置
 */

module.exports = function() {
  return {
    module: {
      rules: [
        {
          resource: {
            test: /\.jsx$/,
            // exclude: [/(node_modules|bower_components)/, /\.test\.js$/],
          },
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [require.resolve('smash-helper-babel-preset-react')],
            },
          },
        },
      ],
    },
  };
};
