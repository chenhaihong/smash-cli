/**
 * 这个webpack配置适用于：
 *    (非web网页类型的)库的开发，react ui库、broswer js库...
 */

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const constants = require('./constants');

module.exports = () => {
  return {
    mode: 'production',
    devtool: 'none', // 生产模式下，也可以选择none，不生成source map
    entry: getEntry(), // 入口文件
    output: getOutput(), // 输出的文件地址、格式
  };
};

/**
 * 获取/lib/*.js(x)文件组成entry
 */
function getEntry() {
  const entry = {};
  const dir = path.resolve(process.cwd(), constants.entryLibDir);
  fse.ensureDirSync(dir);
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (/\.jsx?$/.test(file) && fs.statSync(filePath).isFile()) {
      const { name } = path.parse(filePath);
      entry[name] = filePath;
    }
  }
  return entry;
}

/**
 * 输出的文件地址、格式
 */
function getOutput() {
  return {
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(process.cwd(), constants.outputDir),
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].min.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].min.js',
    libraryTarget: 'umd',
  };
}
