/**
 * 这个webpack配置适用于：
 *    (非web网页类型的)库的开发，react ui库、broswer js库...
 */

const path = require('path');

const fse = require('fs-extra');
const megre = require('webpack-merge');

const _common = require('./cell/webpack.common');
const _html = require('./cell/webpack.html');
const _style = require('./cell/webpack.style');
const _js = require('./cell/webpack.js.js');
const _json = require('./cell/webpack.json.js');
const _reactJSX = require('./cell/webpack.react.jsx.js');
const _vue = require('./cell/webpack.vue.js');
const _minify = require('./cell/webpack.minify');

const constants = require('./constants');

module.exports = function(isProd = true) {
  return megre(_common(), _html(), _style(isProd), _js(), _json(), _reactJSX(), _vue(), _minify(), {
    mode: 'production',
    devtool: 'none', // 生产模式下，也可以选择none，不生成source map
    entry: getEntry(), // 入口文件
    output: getOutput(), // 输出的文件地址、格式
  });
};

/**
 * 获取/lib/*.js(x)文件组成entry
 */
function getEntry() {
  const entry = {};
  const dir = constants.entryLibDir;
  fse.ensureDirSync(dir);
  const files = fse.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (/\.jsx?$/.test(file) && fse.statSync(filePath).isFile()) {
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
    path: constants.outputDir,
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].min.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].min.js',
    libraryTarget: 'umd',
  };
}
