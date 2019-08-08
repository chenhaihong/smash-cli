module.exports = () => {
  return {
    mode: 'development', // 设为开发模式，可显著提升构建速度
    devtool: 'eval-source-map', // 开发模式下使用这个模式，可原始源代码，并且重新构建速度较快
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
