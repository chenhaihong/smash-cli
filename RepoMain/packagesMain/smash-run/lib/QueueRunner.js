/**
 * 中间件队列执行器。
 *
 * 每个task都是一个中间件队列。
 * 执行一个任务，也就是在顺序执行中间件队列。
 */

// 中间件里面的一个上下文。
// 你可以在这个空集对象上挂在任意数据。它会沿着中间件队列传递下去。
const context = Object.create(null);

module.exports = class QueueRunner {
  /**
   * 递归执行中间件队列
   * @param {Array} middlewareQueue
   * @param {Array} installedPaths 中间件的本地安装路径
   * @returns {void}
   */
  static async dequeue(middlewareQueue, installedPaths) {
    //===========================
    //==  Hats off to Express. ==
    //===========================
    const next = () => {
      if (middlewareQueue.length <= 0) {
        return false;
      }

      // 获取中间件配置队列的首位，
      // 用户定义的配置，包含 { name, ...customed_fiedls } 字段
      const middlewareConfig = middlewareQueue.shift();

      // 拿到中间件包的安装路径
      const installedPath = installedPaths.shift();

      // 使用require引入中间件
      const middleware = require(installedPath);
      middleware(context, middlewareConfig, next);
    };

    next();
  }
};
