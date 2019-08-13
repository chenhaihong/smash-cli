/**
 * A shell executor middleware for smash-cli.
 */

const execSh = require('exec-sh');
const SmashLogger = require('smash-helper-logger');

module.exports = SmashShell;

/**
 * Shell executor.
 * @param {Object|null} ctx
 * @param {Object} config 当前中间件的配置信息
 * @param {Function} next 是否执行下一个中间件
 */
function SmashShell(ctx, config, next) {
  let { commonds } = config;
  Array.isArray(commonds) && (commonds = commonds.join(' && '));

  execSh(commonds, (err) => {
    if (err) {
      console.log('');
      console.log(`[smash-middleware-shell] End with exit code ${err.code}.`);
      return;
    }

    if (next) {
      console.log('');
      next();
    }
  });
}
