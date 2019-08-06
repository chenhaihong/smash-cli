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
const logger = require('smash-helper-logger');
const pacote = require('pacote');

// 存放中间件的仓库
const REPO = resolve(os.homedir(), '.smash-cli/middleware');

class MiddlewareInstaller {
  /**
   * 获取中间件列表的安装路径。
   * @param {Array} middlewareConfigQueue 中间件队列的配置信息
   * @returns {void}
   */
  static async getInstalledPaths(middlewareConfigQueue) {
    const paths = [];
    for (const middlewareConfig of middlewareConfigQueue) {
      // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误
      const { name: spec } = middlewareConfig;
      const { name, version } = await pacote.manifest(spec);

      // （2）组装路径， extractDest => 组装存放提取文件的路径
      const extractDest = resolve(REPO, `${name}/${version}`);
      if (!fse.existsSync(extractDest)) {
        logger.info(`[${name}@${version}] extracting...`);
        // （3）提取中间件包的内容
        await pacote.extract(spec, extractDest);
        // （4）安装当前中间件的依赖
        logger.info(`[${name}@${version}] installing dependencies...`);
        execSync('npm i', { cwd: extractDest });
        logger.success(`[${name}@${version}] installed.`);
      }
      // （5）将路径放入要返回的数中组
      paths.push(normalize(extractDest));
    }
    return paths;
  }
}

module.exports = MiddlewareInstaller;
