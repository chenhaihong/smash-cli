/**
 * A shell executor middleware for smash-cli.
 */

const execShPromise = require('exec-sh').promise;
const SmashLogger = require('smash-helper-logger');

module.exports = SmashShell;

/**
 * Shell executor.
 * @param {Object|null} ctx
 * @param {Object} config 当前中间件的配置信息
 * @param {Function} next 是否执行下一个中间件
 * @returns {void} 无返回值
 */
async function SmashShell(ctx, config, next) {
  const logger = new SmashLogger('smash-middleware-shell');
  let { commands = [] } = config;
  typeof commands === 'string' && (commands = [commands]);

  try {
    logger.info('Starting...');
    do {
      const command = commands.shift();
      if (!command) break;
      await execShPromise(command);
    } while (true);
    logger.success('Finished.');

    next && next();
  } catch (error) {
    logger.error(`Exit with code ${error.code}.`);
  }
}
