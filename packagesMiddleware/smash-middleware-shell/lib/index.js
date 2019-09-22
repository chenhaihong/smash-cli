/**
 * A shell executor middleware for smash-cli.
 */

const { join } = require('path');
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

  commands = formatCommands(commands);

  try {
    logger.info('Starting...');

    let lastCwd = process.cwd();
    do {
      let command = commands.shift();
      if (!command) break;

      command = command.trim();
      if (/^cd\s+/.test(command)) {
        // 如果包含cd字符，需要更新工作空间
        // 这个追加工作目录的逻辑参考了exeq的代码逻辑
        lastCwd = join(lastCwd, command.replace(/^cd\s+/, ''));
        continue;
      }

      await execShPromise(command, { cwd: lastCwd });
    } while (true);

    logger.success('Finished.');

    next && next();
  } catch (error) {
    logger.error(`Exit with code ${error.code}.`);
  }
}

// 格式化用户的命令，拆分开包含“&&”字符的命令
function formatCommands(commands) {
  let result = [];
  commands.forEach((item) => {
    item = item.split('&&');
    result = result.concat(item);
  });
  return result;
}
