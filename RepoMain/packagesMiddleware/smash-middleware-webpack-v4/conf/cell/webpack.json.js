/**
 * json处理配置
 */

module.exports = function() {
  return {
    module: {
      rules: [
        {
          resource: { test: /\.json$/ },
          use: ['json-loader'],
        },
      ],
    },
  };
};
