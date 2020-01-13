function sleep(delay) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(1);
    }, delay);
  });
}

module.exports = {
  '/list': {
    method: 'get',
    result: {
      success: true,
      list: [{ name: 'smash run server' }, { name: 'smash run watch' }, { name: 'smash run build' }],
    },
  },
  '/user/profile': {
    method: 'post',
    // 支持异步函数
    async result(req, res, next) {
      await sleep(300);
      return {
        success: true,
        name: 'erye',
      };
    },
  },
};
