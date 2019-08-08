/**
 * A jest middleware for smash-cli.
 */

const path = require('path');
const execSh = require('exec-sh');

module.exports = function middleware(ctx, config, next) {
  let { options = '' } = config;

  // （1）获取options参数，如果是数组，转为字符串
  // 这个参数的规范与jest的规范一致
  Array.isArray(options) && (options = options.join(' '));

  // （2）获取jest的脚本路径
  let shellPath = path.resolve(__dirname, './node_modules/.bin/jest');
  if (process.platform == 'win32') {
    shellPath += '.cmd';
  }
  // （3）执行jest
  execSh([`${shellPath} ${options}`], (err) => {
    if (err) {
      console.log('');
      console.log(`[smash-middleware-jest] End with exit code ${err.code}.`);
      return;
    }

    if (next) {
      console.log('');
      next();
    }
  });
};
