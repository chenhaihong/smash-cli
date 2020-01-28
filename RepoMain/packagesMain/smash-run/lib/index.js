/**
 * Task executing function for smash-cli.
 */

const SmashLogger = require('smash-helper-logger');
const TaskFinder = require('smash-helper-task-finder');
const QueueRunner = require('./QueueRunner');

module.exports = smashRun;

/**
 * 执行任务
 * @param {String} taskName 任务名称
 * @returns {void}
 */
async function smashRun(taskName) {
  const logger = new SmashLogger('smash-run');
  try {
    // （1）获取当前任务对应的中间件队列配置。
    const middlewareQueue = TaskFinder.getMiddlewareQueue(taskName);

    // （2.1）如果用户定义了这个任务
    if (middlewareQueue) {
      // （3）获取该任务的所有中间件的路径。
      // Tip：将中间件的安装路径放在installedPaths数组对象里，
      //      避免污染 middlewareConfigQueue 数组对象。
      const installedPaths = TaskFinder.getInstalledPaths(middlewareConfigQueue);
      // （4）执行中间件队列。
      QueueRunner.dequeue(middlewareQueue, installedPaths);
    }
    // （2.2）如果用户未定义这个任务，提示没有定义该任务
    else {
      logger.fail('Task not found:', taskName, '.');
    }
  } catch (error) {
    logger.fail(error.message);
  }
}
