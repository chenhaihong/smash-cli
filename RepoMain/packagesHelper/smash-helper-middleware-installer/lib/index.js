/**
 * 辅助：中间安装器。
 */

const cp = require('child_process');
const os = require('os');
const { normalize, resolve } = require('path');
const fse = require('fs-extra');
const pacote = require('pacote');

// 本机存放中间件的仓库
const REPO_MIDDLEWARE = resolve(os.homedir(), '.smash-cli', 'middleware');
const FILE_MIDDLEWARE_PATHINFO = resolve(REPO_MIDDLEWARE, 'smash-middleware-pathinfo.json');

module.exports = class SmashHelperMiddlewareInstaller {
  /**
   * 从任务配置里，拿到非重复的中间件名称标识符
   * @param {Object} tasks 任务配置对象
   * @returns {Array} 一个装载中间件名称标识符的数组
   */
  static getUnrepeatedMiddlewareSpecifiers(tasks) {
    tasks = Object.values(tasks);

    const specs = [];
    tasks.forEach((currentTask) => {
      currentTask.forEach((config) => {
        const { name } = config;
        if (!specs.includes(name)) {
          specs.push(name);
        }
      });
    });
    return specs;
  }

  /**
   * 指定版本的包的安装路径。
   * @param {String} name 包名
   * @param {String} version 包的版本号
   * @returns {Object} 包的清单信息
   */
  static resolveInstallationPath(name, version) {
    return normalize(resolve(REPO_MIDDLEWARE, name, version));
  }

  /**
   * 获取包的清单信息。
   * 如果不存在包，会抛出错误。
   * @param {String} specifier 包的标识符
   * @returns {Object} 包的清单信息
   */
  static async manifest(specifier) {
    return await pacote.manifest(specifier);
  }

  /**
   * 是否已经安装过了指定版本的中间件
   * @param {String} name package name
   * @param {String} version package version
   * @returns {Boolean} 是否已经安装
   */
  static hasInstalled(name, version) {
    const destination = SmashHelperMiddlewareInstaller.resolveInstallationPath(name, version);
    // 未提取包
    if (!fse.existsSync(destination)) {
      return false;
    }

    // smashInstallStatus
    // 通过增加状态值来验证是否安装完：提取包完成1=>安装完依赖2
    const file = resolve(destination, 'package.json');
    const { smashInstallStatus } = fse.readJsonSync(file);
    return smashInstallStatus >= 2;
  }

  /**
   * 安装指定版本的中间件
   * @param {String} name 中间件name
   * @param {String} version 中间件版本号
   * @returns {void}
   */
  static async install(name, version) {
    const specifier = `${name}@${version}`;
    const destination = SmashHelperMiddlewareInstaller.resolveInstallationPath(name, version);
    // 提取中间件包，存放到目标目录。目录不存在时，会自动创建。
    await pacote.extract(specifier, destination);
    const file = resolve(destination, 'package.json');
    {
      const pkg = fse.readJsonSync(file);
      fse.writeJsonSync(file, { ...pkg, smashInstallStatus: 1 }, { spaces: 2 });
    }

    // 安装当前中间件的依赖
    // yarn在安装依赖时，存在无法正确执行postinstall的问题，
    // https://www.yuque.com/docs/share/5003aa73-d8c4-444b-b134-257cda25d006
    // 这个问题还没修复，所以这里不使用yarn安装依赖
    cp.execSync('npm i', { cwd: destination });
    {
      const pkg = fse.readJsonSync(file);
      fse.writeJsonSync(file, { ...pkg, smashInstallStatus: 2 }, { spaces: 2 });
    }
  }

  /**
   * 把包标识符和安装路径写到本地中间件信息文件[FILE_MIDDLEWARE_PATHINFO]里
   * @param {String} specifier 包标识符
   * @param {String} installedPath 安装的绝对路径
   * @returns {void}
   */
  static writeInstalledPath(specifier, installedPath) {
    fse.ensureFileSync(FILE_MIDDLEWARE_PATHINFO);
    const pathinfo = fse.readJsonSync(FILE_MIDDLEWARE_PATHINFO, { throws: false }) || {};
    fse.writeJsonSync(
      FILE_MIDDLEWARE_PATHINFO,
      {
        ...pathinfo,
        [specifier]: installedPath,
      },
      { spaces: 2 }
    );
  }

  /**
   * 从本地中间件信息文件[FILE_MIDDLEWARE_PATHINFO]里，拿到中间件的安装路径
   * @param {Array} middlewareQueue 中间件队列
   * @returns {Array} 一个装载中间件安装路径的数组
   */
  static readInstalledPath(specifier) {
    fse.ensureFileSync(FILE_MIDDLEWARE_PATHINFO);
    const pathinfo = fse.readJsonSync(FILE_MIDDLEWARE_PATHINFO, { throws: false }) || {};
    return pathinfo[specifier];
  }
};
