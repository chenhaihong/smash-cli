/**
 * 这个webpack追加配置适用于：（web网页类型的）应用的开发
 */

const path = require('path');

const fse = require('fs-extra');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const constants = require('../constants');

module.exports = () => {
  return {
    entry: getEntry(), // 入口文件
    plugins: getPlugins(), // 往html文件插入js、css文件的标签的插件
  };
};

/**
 * 获取/src/*.js(x)文件组成entry
 */
function getEntry() {
  const entry = {};
  const dir = constants.entryJsDir;
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
 * 根据`/src/assets/*.html`文件新增`HtmlWebPackPlugin`。
 * 每个html文件都会插入生成的js、css文件的标签。
 */
function getPlugins() {
  const plugins = [];
  const dir = constants.entryHtmlDir;
  fse.ensureDirSync(dir);
  const files = fse.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (/\.html$/.test(file) && fse.statSync(filePath).isFile()) {
      const { name } = path.parse(filePath);
      plugins.push(
        new HtmlWebPackPlugin({
          template: path.resolve(filePath),
          filename: file,
          chunks: [name],
        })
      );
    }
  }
  return plugins;
}
