/**
 * 中间件安装器。
 */

const Logger = require('smash-helper-logger');
const TaskFinder = require('smash-helper-task-finder');
const HMI = require('smash-helper-middleware-installer');

module.exports = smashInstall;

/**
 * 搜集当前工作目录下所有的任务，并安装所有需要的中间件。
 * 已经安装过的中间件，不会被重复安装。
 * @returns {void}
 */
async function smashInstall() {
  const logger = new Logger('smash-install');

  try {
    const tasks = TaskFinder.getTasks();
    const specs = HMI.getUnrepeatedMiddlewareSpecifiers(tasks);
    for (const specifier of specs) {
      // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误，
      //      因为在最外层已经写了捕获异常的逻辑，所以这里不用写这个逻辑。
      const { name, version } = await HMI.manifest(specifier);
      if (HMI.hasInstalled(name, version)) {
        // （2.1）已经安装过了，更新中间件信息文件
        const installedPath = HMI.resolveInstallationPath(name, version);
        HMI.writeInstalledPath(specifier, installedPath);
        logger.info(`[${name}@${version}] Already installed.`);
      } else {
        logger.info(`[${name}@${version}] Installing...`);
        // （2.2）安装中间件
        await HMI.install(name, version);
        // （3）更新中间件信息文件
        const installedPath = HMI.resolveInstallationPath(name, version);
        HMI.writeInstalledPath(specifier, installedPath);
        logger.success(`[${name}@${version}] Successfully installed.`);
      }
    }
  } catch (error) {
    logger.fail(error.message);
  }
}
