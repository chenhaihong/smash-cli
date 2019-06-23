/**
 * smash-cli工具的默认任务配置生成器。
 */

const fse = require('fs-extra');
const { resolve } = require('path');
const message = {
  'CONFIG_EXISTS': 'There is already a task configuration file in the current working directory.',
  'INITIALLIZED_SUCCESSFULLY': 'Initialized current working directory successfully.'
};

function init() {
  const DEFAULT_SMASH_DIR = resolve(__dirname, '.defaultSmash'), // 默认配置文件的路径
    CWD_SMASH_DIR = resolve(process.cwd(), '.smash'), // 工作目录下的.smash目录
    CWD_SMASH_FILE = resolve(CWD_SMASH_DIR, 'task.yml'); // 工作目录下的.smash任务配置文件

  if (fse.pathExistsSync(CWD_SMASH_FILE)) {
    console.log(message.CONFIG_EXISTS);
  } else {
    fse.copySync(DEFAULT_SMASH_DIR, CWD_SMASH_DIR);
    console.log(message.INITIALLIZED_SUCCESSFULLY);
  }
}

module.exports = init;