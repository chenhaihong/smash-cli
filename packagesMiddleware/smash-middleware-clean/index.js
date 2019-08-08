/**
 * A directory cleaner middleware for smash-cli.
 */

const path = require('path');
const fs = require('fs-extra');

module.exports = function middleware(ctx, config, next) {
  // （1）获取并规范化参数
  let { dirs, remove = false } = config;
  typeof dirs === 'string' && (dirs = [dirs]);

  // （2）遍历数组
  dirs.forEach((dir) => {
    dir = dir.trim();
    // 目录是空，进入下一个
    if (!dir) return;

    // 如果是 / 或 \ 开头的目录，加上 . 前缀，避免对根目录进行清空操作
    /^(\/|\\)/.test(dir) && (dir = '.' + dir);

    // 目录不存在，直接进入下一个
    dir = path.resolve(process.cwd(), dir);
    if (fs.pathExistsSync(dir)) {
      const method = remove ? 'removeSync' : 'emptyDirSync';
      fs[method](dir);
    }
  });

  next && next();
};
