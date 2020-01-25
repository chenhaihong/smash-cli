/**
 * 如果这个版本的中间件未被安装，安装中间件包到仓库下。
 *
 * Tips:
 * （1）repository：{home}/.smash-cli/middleware
 * （2）中间件代码的提取路径规则为：{repository}/{name}/{version}
 */

const { execSync } = require('child_process');
const os = require('os');
const { normalize, resolve } = require('path');
const fse = require('fs-extra');
const pacote = require('pacote');
const SmashLogger = require('smash-helper-logger');

// 存放中间件的仓库
const REPO = resolve(os.homedir(), '.smash-cli/middleware');

module.exports = class MiddlewareInstaller {
  /**
   * 获取中间件列表的安装路径。
   * @param {Array} middlewareConfigQueue 中间件队列的配置信息
   * @returns {void}
   */
  static async getInstalledPaths(middlewareConfigQueue) {
    const paths = [];
    const logger = new SmashLogger('smash-run');
    for (const middlewareConfig of middlewareConfigQueue) {
      // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误，
      //      因为在最外层已经写了捕获异常的逻辑，所以这里不用写这个逻辑。
      const { name: specifier } = middlewareConfig;
      const { name, version } = await pacote.manifest(specifier);

      // （2）组装路径， extractDest => 组装存放提取文件的路径
      const extractDest = resolve(REPO, name, version);
      // TODO L38 没去验证以前下载过的包是否下载完整，需要增加这个逻辑，
      // 通过增加状态值来验证：未下载完(无状态值)=>下载完成1=>安装完依赖2
      if (!fse.existsSync(extractDest)) {
        // （3）提取中间件包的内容
        logger.info(`[${name}@${version}] Extracting...`);
        // TODO L42 这一行的逻辑可能不正确，在包突然被更新的情况下，版本不会正确
        await pacote.extract(specifier, extractDest);
        // （4）安装当前中间件的依赖
        logger.info(`[${name}@${version}] Installing dependencies...`);
        execSync('npm i', { cwd: extractDest });
        logger.success(`[${name}@${version}] Installed.`);
      }
      // （5）将路径放入要返回的数中组
      paths.push(normalize(extractDest));
    }
    return paths;
  }

  /**
   * 解析包名和版本号
   * @param {String} specifier '@group/package@version'
   */
  static parse(specifier) {
    // 包的类型总共有4种，
    // （1）'smash-cli'              => arr = [ 'smash-cli' ]
    // （2）'smash-cli@1.0.0'        => arr = [ 'smash-cli', '1.0.0' ]
    // （3）'@erye/smash-cli'        => arr = [ '', 'erye/smash-cli' ]
    // （4）'@erye/smash-cli@1.0.0'  => arr = [ '', 'erye/smash-cli', '1.0.0' ]
    const arr = specifier.split('@');
    if (arr[0] == '') {
      // 数组首位是空，符合类型 3、4
      arr[1] = '@' + arr[1]; // 给第二位加上 @ 字符
      arr.shift(); // 移除首位
    }
    return { name: arr[0], version: arr[1] };
  }

  /**
   * 本地已有，且有效，返回存储路径
   * @param {String} specifier '@group/package@version'
   */
  static getExistentPath(specifier) {
    const { name, version } = this.parse(specifier);
    let extractDest = resolve(REPO, name);
    if (!version) {
    } else {
      extractDest = resolve(extractDest, version);
      if (fse.existsSync(extractDest)) {
        return extractDest;
      }
    }
    return undefined;
  }

  /**
   * 下载并提取包文件，返回存储路径
   * @param {String} specifier '@group/package@version'
   */
  static async getFreshPath(specifier) {
    const { name, version } = await pacote.manifest(specifier);
  }
};
