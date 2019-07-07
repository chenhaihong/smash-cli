/**
 * 如果这个版本的中间件未被安装，安装中间件包到仓库下。
 *
 * Tips:
 * （1）repository：{home}/.smash-cli/middleware
 * （2）中间件代码的提取路径规则为：{repository}/{name}/{version}
 *
 * @format
 */

const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const pacote = require('pacote');

const MILLDDLEWARE_REPOSITORY = path.resolve(
  os.homedir(),
  './.smash-cli/middleware/',
);

class MiddlewareInstaller {
  /**
   * 获取中间件列表的安装路径。
   * @param {Array} middlewareConfigQueue 中间件队列的配置信息
   */
  static async getInstalledPaths(middlewareConfigQueue) {
    const paths = [];
    for (const middlewareConfig of middlewareConfigQueue) {
      // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误
      const { name: spec } = middlewareConfig;
      const { name, version } = await pacote.manifest(spec);

      // （2）组装路径， extractDest => 组装存放提取文件的路径
      const extractDest = path.resolve(
        MILLDDLEWARE_REPOSITORY,
        `./${name}/${version}`,
      );
      if (!fs.existsSync(extractDest)) {
        console.log(`[smash-run] [${name}@${version}] Installing...`);
        // （3）提取中间件包的内容
        await pacote.extract(spec, extractDest);
        // （4）安装当前中间件的依赖
        console.log(
          `[smash-run] [${name}@${version}] Installing dependencies...`,
        );
        execSync('npm i', { cwd: extractDest });
        console.log(`[smash-run] [${name}@${version}] Installed.`);
      }
      // （5）将路径放入要返回的数中组
      paths.push(path.normalize(extractDest));
    }
    return paths;
  }
}

module.exports = MiddlewareInstaller;
