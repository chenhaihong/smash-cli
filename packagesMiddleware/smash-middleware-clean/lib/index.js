/**
 * A directory cleaner middleware for smash-cli.
 */

const { normalize, join } = require('path');
const fse = require('fs-extra');

module.exports = SmashMiddlewareClean;

/**
 * Directory cleaner middleware.
 * @param {Object} ctx
 * @param {Object} config 配置对象
 * @param {Function|null} next 下一个待执行的中间件函数
 */
function SmashMiddlewareClean(ctx, config, next) {
  // （1）获取并规范化参数
  let { dirs, remove = false } = config;
  typeof dirs === 'string' && (dirs = [dirs]);

  // （2）遍历数组
  dirs.forEach((dir) => {
    dir = dir.trim();
    // 目录是空，进入下一个
    if (!dir) return;

    // 目录不存在，直接进入下一个
    dir = normalize(join(process.cwd(), dir));
    if (fse.pathExistsSync(dir)) {
      const method = remove ? 'removeSync' : 'emptyDirSync';
      fse[method](dir);
    }
  });

  next && next();
}
