const megre = require('webpack-merge');

const _common = require('./cell/webpack.common');
const _html = require('./cell/webpack.html');
const _style = require('./cell/webpack.style');
const _js = require('./cell/webpack.js.js');
const _json = require('./cell/webpack.json.js');
const _reactJSX = require('./cell/webpack.react.jsx.js');
const _vue = require('./cell/webpack.vue.js');

const _jsHtmlEntry = require('./cell/webpack.jsHtmlEntry'); // js入口、html模板入口

module.exports = function(isProd = true) {
  return megre(_common(), _html(), _style(isProd), _js(), _json(), _reactJSX(), _vue(), _jsHtmlEntry(), {
    // 设为开发模式，可显著提升构建速度
    mode: 'development',

    // 开发模式下使用这个模式，可在浏览器开发者工具阅读原始源代码，并且重新构建速度较快
    devtool: 'eval-source-map',

    // watch 和 watchOptions
    // https://webpack.docschina.org/configuration/watch/
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  });
};
