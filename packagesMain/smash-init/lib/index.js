/**
 * smash-cli工具的默认任务配置生成器。
 */

const fse = require('fs-extra');
const { resolve } = require('path');
const logger = require('smash-helper-logger');

/**
 * 拷贝默认smash任务配置文件到当前工作空间的目录里
 *
 * @returns {void} 无返回值
 */
function init() {
  const ROOT = resolve(__dirname, '..'),
    dirDefaultSmash = resolve(ROOT, '.defaultSmash'), // 默认配置文件的路径
    dirCwdSmash = resolve(process.cwd(), '.smash'), // 工作目录下的.smash目录
    fileCwdSmash = resolve(dirCwdSmash, 'task.yml'); // 工作目录下的.smash任务配置文件

  if (fse.pathExistsSync(fileCwdSmash)) {
    logger.info('task.yml existed.');
  } else {
    fse.copySync(dirDefaultSmash, dirCwdSmash);
    logger.success('initialized successfully.');
  }
}

module.exports = init;
