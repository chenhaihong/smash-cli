/**
 * A copy middleware for smash-cli.
 * 拷贝工作目录下的文件（夹）到指定位置，支持模板文件的拷贝。
 */

const path = require('path');
const fse = require('fs-extra');
const Glob = require('glob').Glob;
const Handlebars = require('handlebars');
const isGlob = require('is-glob');

module.exports = function copy(ctx, config, next) {
  let { files = [], tplData = null } = config;
  typeof files === 'string' && (files = [files]);

  const sign = '->';
  files.forEach((file) => {
    // 只有 ./a.js -> ./b.js 才能走下面的逻辑
    if (file.indexOf(sign) === '-1') return;
    let [src, dst] = file.split(sign);
    src = src.trim();
    dst = dst.trim();

    // glob类型
    if (isGlob(src)) {
      copyPattern(src, dst, tplData);
      return;
    }

    src = safePath(src);
    dst = safePath(dst);
    if (!fse.pathExistsSync(src)) return;

    const stats = fse.statSync(src);
    if (stats.isFile()) {
      copyFile(src, dst, tplData);
    } else if (stats.isDirectory()) {
      copyDir(src, dst, tplData);
    }
  });

  next && next();
};

function safePath(p) {
  p = p.trim();
  /^(\/|\\)/.test(p) && (p = '.' + p);
  p = path.resolve(process.cwd(), p);
  return p;
}

function copyFile(srcFile, dstFile, tplData = null) {
  console.log(`Copy ${srcFile} -> ${dstFile}`);
  let source = fse.readFileSync(srcFile, 'utf8');
  if (tplData) {
    source = Handlebars.compile(source)(tplData);
  }
  fse.ensureFileSync(dstFile);
  fse.writeFileSync(dstFile, source, 'utf8');
}

function copyDir(srcDir, destDir, tplData = null) {
  const files = fse.readdirSync(srcDir);
  for (const file of files) {
    const srcFIle = path.resolve(srcDir, `./${file}`);
    const dstFile = path.resolve(destDir, `./${file}`);
    copyFile(srcFIle, dstFile, tplData);
  }
}

function copyPattern(pattern, destDir, tplData = null) {
  const mg = new Glob(pattern, { mark: true, sync: true });
  mg.found.forEach((file) => {
    const srcFile = path.resolve(process.cwd(), file);
    const dstFile = path.resolve(destDir, file);
    copyFile(srcFile, dstFile, tplData);
  });
}
