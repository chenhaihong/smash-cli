/**
 * Task executing function for smash-cli.
 *
 * @format
 */

const message = require('./message');
const TaskFinder = require('./lib/TaskFinder');
const MiddlewareInstaller = require('./lib/MiddlewareInstaller');
const QueueRunner = require('./lib/QueueRunner');

const run = async (taskName) => {
  try {
    // （1）获取当前任务对应的中间件队列配置。
    const middlewareConfigQueue = TaskFinder.getMiddlewareQueue(taskName);

    // （2.1）如果用户定义了这个任务
    if (middlewareConfigQueue) {
      // （3）获取该任务的所有中间件的路径。
      // Tip：将中间件的安装路径放在installedPaths数组对象里，避免污染 middlewareConfigQueue 数组对象。
      const installedPaths = await MiddlewareInstaller.getInstalledPaths(
        middlewareConfigQueue,
      );
      // （4）执行中间件队列。
      QueueRunner.dequeue(middlewareConfigQueue, installedPaths);
    }
    // （2.2）如果用户未定义这个任务，提示没有定义该任务
    else {
      console.info(message.TASK_NOT_FOUND);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = run;
