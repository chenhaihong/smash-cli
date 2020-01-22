const { join } = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const megre = require('webpack-merge');

const _common = require('./cell/webpack.common');
const _html = require('./cell/webpack.html');
const _style = require('./cell/webpack.style');
const _js = require('./cell/webpack.js.js');
const _json = require('./cell/webpack.json.js');
const _reactJSX = require('./cell/webpack.react.jsx.js');
const _vue = require('./cell/webpack.vue.js');

const _jsHtmlEntry = require('./cell/webpack.jsHtmlEntry'); // js入口、html模板入口

const constants = require('./constants');

module.exports = function(isProd = true) {
  return megre(_common(), _html(), _style(isProd), _js(), _json(), _reactJSX(), _vue(), _jsHtmlEntry(), {
    mode: 'development', // 设为开发模式，可显著提升构建速度
    devtool: 'eval-source-map', // 开发模式下使用这个模式，不仅可阅读原始源代码，同时重新构建速度也较快
    devServer: {
      contentBase: constants.outputDir,
      compress: true,
      open: true,
      hot: true,
      // port: 8080,
      overlay: {
        warnings: true,
        errors: true,
      },
      proxy: getProxy(), // 代理配置
      after(app) {
        app.use((req, res, next) => {
          // 控制台展示请求
          console.log(`[${req.method}] ${req.url}`);
          next();
        });

        addMocks(app); // 添加mock支持
      },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()], // 启用hot(Only)后，需要追加此插件，才能生效页面自动刷新
  });
};

/**
 * 添加mock支持。
 *
 * @param {Object} app express服务实例
 */
function addMocks(app) {
  app.use(async function(req, res, next) {
    const mocks = getMocks();
    const mock = mocks[req.path];
    if (!mock) {
      return next();
    }

    const { method, result } = mock;
    if (req.method.toLocaleLowerCase() !== method.toLocaleLowerCase()) {
      return next();
    }

    typeof result === 'function' ? res.json(await result(req, res, next)) : res.json(result);
  });
}

/**
 * 获取mocks对象
 */
function getMocks() {
  // （1）mock目录下所有的js文件，把他们全部合并到mocks对象
  let mocks = {};
  const mockDir = constants.mockDir;
  fse.ensureDirSync(mockDir);
  const files = fse.readdirSync(mockDir);
  for (const file of files) {
    const filePath = join(mockDir, file);
    if (/\.js$/.test(file) && fse.statSync(filePath).isFile()) {
      delete require.cache[require.resolve(filePath)];
      mocks = { ...mocks, ...require(filePath) };
    }
  }

  return mocks;
}

/**
 * 获取代理
 */
function getProxy() {
  let config = {};
  const url = constants.proxyFile;
  if (fse.pathExistsSync(url)) {
    config = require(url);
    if (typeof config === 'function') {
      config = config();
    }
  } else {
    fse.ensureFileSync(url);
    fse.outputFileSync(
      url,
      `
module.exports = {
  // 代理示例
  // '/api': 'http://localhost:3000'
};`
    );
  }

  return config;
}
