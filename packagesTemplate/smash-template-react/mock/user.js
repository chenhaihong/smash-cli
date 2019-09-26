function sleep(delay) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(1);
    }, delay);
  });
}

module.exports = {
  '/user/profile': {
    // 请求类型
    method: 'get',
    result: {
      success: true,
      name: 'erye',
    },
  },
  '/user/login': {
    method: 'post',
    // 支持纯函数类型，返回结果为纯函数执行结果
    async result(req, res, next) {
      await sleep(300);
      return {
        success: Math.random() > 0.5,
      };
    },
  },
};
