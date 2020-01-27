/**
 * 中间件安装器。
 */

const { execSync } = require('child_process');
const os = require('os');
const { resolve } = require('path');
const fse = require('fs-extra');
const pacote = require('pacote');
const Logger = require('smash-helper-logger');
const TaskFinder = require('smash-helper-task-finder');

// 本机存放中间件的仓库
const REPO_MIDDLEWARE = resolve(os.homedir(), '.smash-cli', 'middleware');

module.exports = smashInstall;

/**
 * 搜集当前工作目录下所有的任务，并安装所有需要的中间件。
 * 已经安装过的中间件，不会被重复安装。
 * @returns {void}
 */
async function smashInstall() {
  const logger = new Logger('smash-install');

  try {
    const specs = TaskFinder.getMiddlewareSpecifiers();
    for (const specifier of specs) {
      // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误，
      //      因为在最外层已经写了捕获异常的逻辑，所以这里不用写这个逻辑。
      const { name, version } = await pacote.manifest(specifier);

      if (hasInstalled(name, version)) {
        // （2.1）已经安装过了
        logger.info(`[${name}@${version}] Already installed.`);
      } else {
        logger.info(`[${name}@${version}] Installing...`);
        // （2.2）组装路径， dest => 组装存放提取文件的路径
        const dest = resolve(REPO_MIDDLEWARE, name, version);
        // （3）安装中间件
        await install(specifier, dest);
        logger.success(`[${name}@${version}] Successfully installed.`);
      }
    }
  } catch (error) {
    logger.fail(error.message);
  }
}

/**
 * 解析包名和版本号
 * @param {String} name package name
 * @param {String} version package version
 * @returns {Boolean} 是否已经安装
 */
async function hasInstalled(name, version) {
  const dir = resolve(REPO_MIDDLEWARE, name, version);
  // 未提取包
  if (!fse.existsSync(dir)) {
    return false;
  }

  // smashInstallStatus
  // 通过增加状态值来验证是否安装完：提取包完成1=>安装完依赖2
  const file = resolve(dir, 'package.json');
  const { smashInstallStatus } = require(file);
  return smashInstallStatus < 2;
}

/**
 * 解析包名和版本号
 * @param {String} specifier '@group/package@version'
 * @param {String} destination 存放中间件的目录，如果目录不存在，会被自动创建
 * @returns {void}
 */
async function install(specifier, destination) {
  // 提取中间件包
  await pacote.extract(specifier, destination);
  const file = resolve(destination, 'package.json');
  {
    const pkg = require(file);
    fse.writeJsonSync(file, { ...pkg, smashInstallStatus: 1 });
  }

  // 安装当前中间件的依赖
  // yarn在安装依赖时，存在无法正确执行postinstall的问题，
  // https://www.yuque.com/docs/share/5003aa73-d8c4-444b-b134-257cda25d006
  // 这个问题还没修复，所以这里不使用yarn安装依赖
  execSync('npm i', { cwd: destination });
  {
    const pkg = require(file);
    fse.writeJsonSync(file, { ...pkg, smashInstallStatus: 2 });
  }
}
