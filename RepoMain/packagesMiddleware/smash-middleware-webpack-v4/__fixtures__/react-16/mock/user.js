function sleep(delay) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve(1);
    }, delay);
  });
}

module.exports = {
  '/user/profile': {
    method: 'get',
    result: {
      success: true,
      name: 'erye',
      age: 9660,
    },
  },
  '/user/login': {
    method: 'get',
    async result(req, res, next) {
      await sleep(300);
      return {
        success: Math.random() > 0.5,
      };
    },
  },
  '/user/friends': {
    method: 'get',
    result: {
      success: true,
      list: [{ name: 'erye', age: 20 }, { name: 'erye', age: 20 }, { name: 'erye', age: 20 }],
    },
  },
};
