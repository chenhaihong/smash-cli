/**
 * 任务执行函数
 */

const SmashLogger = require('smash-helper-logger');
const TaskFinder = require('smash-helper-task-finder');
const HMI = require('smash-helper-middleware-installer');
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

    // （2.1）如果用户未定义这个任务，提示没有定义该任务
    if (!middlewareQueue) {
      throw new Error(`Task not found: ${taskName}.`);
    }

    // （2.2）如果用户定义了这个任务，获取该任务的所有中间件的路径。
    // Tip：
    // 因为不知道中间件开发者会在配置里面使用什么字段，
    // 所以，将中间件的安装路径放在installedPaths数组对象里，
    // 避免污染 middlewareQueue 数组对象。
    const installedPaths = middlewareQueue.map(({ name: specifier }) => {
      const installedPath = HMI.readInstalledPath(specifier);
      if (!installedPath) {
        throw new Error(`Middleware ${specifier} hasn't been installed. Run \`smash install\` to install it.`);
      }
      return installedPath;
    });
    // （3）执行中间件队列。
    QueueRunner.dequeue(middlewareQueue, installedPaths);
  } catch (error) {
    logger.fail(error.message);
  }
}
