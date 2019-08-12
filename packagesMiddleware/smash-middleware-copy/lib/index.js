/**
 * A copy middleware for smash-cli.
 * 拷贝工作目录下的文件（夹）到指定位置，支持模板文件的拷贝。
 */

const { basename, join, resolve } = require('path');
const fse = require('fs-extra');
const Glob = require('glob').Glob;
const Handlebars = require('handlebars');
const isGlob = require('is-glob');
const SmashLogger = require('smash-helper-logger');

const logger = new SmashLogger('smash-middleware-copy');

module.exports = SmashCopy;

/**
 * A copy middleware for smash-cli.
 * @param {Object|null} ctx 传递的数据
 * @param {Object} config 当前中间件的配置信息
 * @param {Function|null} next 执行下一个中间件的函数
 * @returns {void} 无返回值
 */
function SmashCopy(ctx, config, next) {
  let { files = [], tplData = null } = config;
  typeof files === 'string' && (files = [files]);

  const reg = /-+>/;
  files.forEach((line) => {
    // 类型0：不包含"-->"符号。只有包含"-->"才能走下面的逻辑，比如"/a.js --> /b.js"
    if (!line.match(reg)) {
      logger.warn('/-+>/ not matched:', line);
      return;
    }
    let [src, dst] = line.split(reg);
    src = src.trim();
    dst = dst.trim();

    // 类型1：glob类型
    if (isGlob(src)) {
      _copyGlob(src, dst, tplData);
      return;
    }

    // 类型2：不存在的文件（夹）
    src = join(process.cwd(), src);
    dst = join(process.cwd(), dst);
    if (!fse.pathExistsSync(src)) {
      logger.warn('Path not found:', src);
      return;
    }

    // 类型3：不包含tplData
    if (!tplData) {
      fse.copySync(src, dst);
      return;
    }

    // 类型4：包含tplData的文件（夹）
    const stats = fse.statSync(src);
    if (stats.isDirectory()) {
      _copyDir(src, dst, tplData);
    } else {
      _copyFile(src, dst, tplData);
    }
  });

  next && next();
}

/**
 * 拷贝符合glob的文件到目标目录，如果目录里的文件含有模板数据，则进行替换
 * @param {String} pattern glob path pattern
 * @param {String} destDir 目标文件夹
 * @param {Object|null} tplData 模板数据
 * @returns {void} 无返回值
 */
function _copyGlob(pattern, destDir, tplData) {
  // 如果以 / 开头，实例化Glob时无法找到匹配的路径。
  // 需要把 /src/lib-a/*.js 转为 ./src/lib-a/*.js。
  /^\//.test(pattern) && (pattern = '.' + pattern);

  const cwd = process.cwd();
  const mg = new Glob(pattern, { mark: true, sync: true });
  mg.found.forEach((file) => {
    const src = join(cwd, file);
    const dst = join(cwd, destDir, basename(src));
    const stats = fse.statSync(src);
    if (stats.isDirectory()) {
      _copyDir(src, dst, tplData);
    } else {
      _copyFile(src, dst, tplData);
    }
  });
}

/**
 * 拷贝文件到目标地址，如果含有模板数据，则进行替换
 * @param {String} srcFile 源文件地址
 * @param {String} dstFile 目标文件地址
 * @param {Object|null} tplData 模板数据
 * @returns {void} 无返回值
 */
function _copyFile(srcFile, dstFile, tplData) {
  logger.info(`Copy ${srcFile} -> ${dstFile}`);
  let source = fse.readFileSync(srcFile, 'utf8');
  if (tplData) {
    source = Handlebars.compile(source)(tplData);
  }
  fse.ensureFileSync(dstFile);
  fse.writeFileSync(dstFile, source, 'utf8');
}

/**
 * 拷贝目录到目标地址，如果目录里的文件含有模板数据，则进行替换
 * @param {String} srcDir 源文件夹
 * @param {String} destDir 目标文件夹
 * @param {Object|null} tplData 模板数据
 * @returns {void} 无返回值
 */
function _copyDir(srcDir, destDir, tplData) {
  const files = fse.readdirSync(srcDir);
  for (const file of files) {
    const src = join(srcDir, file);
    const dst = join(destDir, file);
    const stats = fse.statSync(src);
    if (stats.isDirectory()) {
      _copyDir(src, dst, tplData);
    } else {
      _copyFile(src, dst, tplData);
    }
  }
}
