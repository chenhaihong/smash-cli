/**
 * html处理配置
 */

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: { attrs: false },
        },
      ],
    },
  };
};
