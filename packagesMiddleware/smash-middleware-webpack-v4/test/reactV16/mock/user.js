module.exports = {
  '/user/profile': {
    method: 'get',
    result: {
      success: true,
      name: 'erye',
    },
  },
  '/user/login': {
    method: 'post',
    result() {
      return {
        success: Math.random() > 0.5,
      };
    },
  },
};
