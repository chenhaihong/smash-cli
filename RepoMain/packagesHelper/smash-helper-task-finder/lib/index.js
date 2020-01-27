/**
 * 任务查找器。
 */

const fse = require('fs-extra');
const { resolve } = require('path');
const yaml = require('yaml'); // 使用yaml包来解析yaml配置

module.exports = class TaskFinder {
  /**
   * 获取用户配置的任务列表
   * @returns {Object} 任务配置对象
   */
  static getTasks() {
    const tasks = Object.create(null);

    const dir = resolve(process.cwd(), '.smash');
    fse.ensureDirSync(dir);
    const files = fse.readdirSync(dir);
    for (const file of files) {
      const filePath = resolve(dir, file);
      if (/\.ya?ml$/.test(file) && fse.statSync(filePath).isFile()) {
        const str = fse.readFileSync(filePath, 'utf8');
        const obj = yaml.parse(str);
        Object.assign(tasks, obj);
      }
    }

    return tasks;
  }

  /**
   * 通过任务名称获取该任务下的中间件列表及包含的参数
   * @param {String} taskName 任务名称
   * @returns {Array|undefined} 一个中间对队列，或者`undefined`
   */
  static getMiddlewareQueue(taskName) {
    const tasks = this.getTasks();
    return tasks[taskName]; // 每个任务都是一个中间件队列
  }

  /**
   * 拿到任务中所有的非重复的中间件
   * @returns {Array} 一个装载中间件的数组
   */
  static getMiddlewareNames() {
    const middlewares = [];
    const tasks = Object.values(this.getTasks());
    tasks.forEach((currentTask) => {
      currentTask.forEach((config) => {
        const { name } = config;
        if (!middlewares.includes(name)) {
          middlewares.push(name);
        }
      });
    });
    return middlewares;
  }
};
