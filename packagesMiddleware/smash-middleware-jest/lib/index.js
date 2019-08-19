/**
 * A jest middleware for smash-cli.
 */

const path = require('path');
const execSh = require('exec-sh');
const jest = require('jest');
const SmashLogger = require('smash-helper-logger');

module.exports = function middleware(ctx, config, next) {
  let { type = null, options = '' } = config;
  const logger = new SmashLogger('smash-middleware-jest');
  const TYPES = {
    NODE: 'node', // 针对node应用
    REACT: 'react', // 针对react应用
    TYPESCRIPT: 'typescript', // 针对TS应用
    VANILLA: 'vanilla', // 针对浏览器环境的原生js应用
    VUE: 'vue', // 针对vue应用
  };

  // （1）检查检查类型是否为空
  if (!type) {
    logger.warn('Please specify the type of your application.');
    return;
  }

  // （2）检查类型是否正确
  const keys = Object.keys(TYPES);
  if (!keys.includes(type)) {
    logger.warn('Not supported type:', type);
    return;
  }

  // （1）获取options参数，如果是数组，转为字符串
  // 这个参数的规范与jest的规范一致
  Array.isArray(options) && (options = options.join(' '));

  // （2）获取jest的脚本路径
  let shellPath = path.resolve(__dirname, '../node_modules/.bin/jest');
  if (process.platform == 'win32') {
    shellPath += '.cmd';
  }
  // （3）执行jest
  execSh([`${shellPath} ${options}`], (err) => {
    if (err) {
      console.log(`[smash-middleware-jest] End with exit code ${err.code}.`);
      return;
    }

    next && next();
  });
};
