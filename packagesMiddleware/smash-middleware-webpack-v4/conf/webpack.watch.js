module.exports = () => {
  return {
    // 设为开发模式，可显著提升构建速度
    mode: 'development',

    // 开发模式下使用这个模式，可在浏览器开发者工具阅读原始源代码，并且重新构建速度较快
    devtool: 'eval-source-map',

    // watch 和 watchOptions
    // https://webpack.docschina.org/configuration/watch/
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
