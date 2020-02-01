/**
 * js 处理配置
 */

module.exports = function() {
  return {
    module: {
      rules: [
        {
          resource: {
            test: /\.js$/,
            exclude: [/(node_modules|bower_components)/, /\.test\.js$/],
          },
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [require.resolve('smash-helper-babel-preset-env')],
            },
          },
        },
      ],
    },
  };
};
