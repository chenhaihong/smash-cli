const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const constants = require('./constants');

module.exports = () => {
  return {
    mode: 'development', // 设为开发模式，可显著提升构建速度
    devtool: 'eval-source-map', // 开发模式下使用这个模式，不仅可阅读原始源代码，同时重新构建速度也较快
    devServer: getDevServer(),
    plugins: [new webpack.HotModuleReplacementPlugin()], // 启用hot(Only)后，需要追加此插件，才能生效页面自动刷新
  };
};

/**
 * devServer的配置
 */
function getDevServer() {
  return {
    contentBase: path.resolve(process.cwd(), constants.outputDir),
    compress: true,
    open: true,
    hot: true,
    // port: 8080,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: getProxy(), // 代理配置
    before(app) {
      app.use((req, res, next) => {
        // 控制台展示请求
        console.log(`[${req.method}] ${req.url}`);
        next();
      });

      addMocks(app); // 添加mock支持
    },
  };
}

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
  const dir = path.resolve(process.cwd(), constants.mockDir);
  fse.ensureDirSync(dir);
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (/\.js$/.test(file) && fs.statSync(filePath).isFile()) {
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
  const url = path.resolve(process.cwd(), constants.proxyFile);
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
