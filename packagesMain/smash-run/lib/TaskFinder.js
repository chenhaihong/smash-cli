/**
 * 任务查找器。
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml'); // 使用yaml包来解析yaml配置

module.exports = class TaskFinder {
  /**
   * 获取用户配置的任务列表
   * @returns {Object} 任务配置对象
   */
  static getTasks() {
    const tasksYmlUrl = path.resolve(process.cwd(), './.smash/task.yml'); // 用户配置地址
    const file = fs.readFileSync(tasksYmlUrl, 'utf8');
    const tasks = yaml.parse(file);
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
};
