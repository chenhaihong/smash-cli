/**
 * 中间件安装器。
 */

const os = require('os');
const { join, resolve } = require('path');
const fse = require('fs-extra');
const pacote = require('pacote');
const tar = require('tar');
const TaskFinder = require('smash-helper-task-finder');
const SmashLogger = require('smash-helper-logger');

// 本机存放中间件的仓库
const REPO = resolve(os.homedir(), '.smash-cli/middleware');

module.exports = smashInstall;

/**
 * 安装模板到工作目录，然后拷贝里面的文件到工作目录。
 * @param {String} tplName 模板名，比如：smash-template-react@^16.0.0
 * @returns {void}
 */
async function smashInstall(tplName) {
  const logger = new SmashLogger('smash-install');

  try {
    const tasks = TaskFinder.getTasks();
  } catch (error) {
    logger.fail(error.message);
  }
}
