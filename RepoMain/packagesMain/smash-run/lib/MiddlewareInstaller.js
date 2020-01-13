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
      const { name: spec } = middlewareConfig;
      const { name, version } = await pacote.manifest(spec);

      // （2）组装路径， extractDest => 组装存放提取文件的路径
      const extractDest = resolve(REPO, `${name}/${version}`);
      // TODO L38 没去验证以前下载过的包是否下载完整，需要增加这个逻辑，
      // 通过增加状态值来验证：未下载完(无状态值)=>下载完成1=>安装完依赖2
      if (!fse.existsSync(extractDest)) {
        // （3）提取中间件包的内容
        logger.info(`[${name}@${version}] Extracting...`);
        // TODO L42 这一行的逻辑可能不正确，在包突然被更新的情况下，版本不会正确
        await pacote.extract(spec, extractDest);
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
};
