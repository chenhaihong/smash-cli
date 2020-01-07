/**
 * A shell executor middleware for smash-cli.
 */

const { join } = require('path');
const execSh = require('exec-sh');
const kill = require('tree-kill');
const SmashLogger = require('smash-helper-logger');

const execShPromise = execSh.promise;

module.exports = SmashShell;

/**
 * Shell executor.
 * @param {Object|null} ctx
 * @param {Object} config 当前中间件的配置信息
 * @param {Function} next 是否执行下一个中间件
 * @returns {void} 无返回值
 */
async function SmashShell(ctx, config, next) {
  onExitSignal();

  const logger = new SmashLogger('smash-middleware-shell');
  let { commands = [], parallel = false } = config;
  typeof commands === 'string' && (commands = [commands]);

  commands = formatCommands(commands);
  const count = commands.length;
  let execTimes = 0;

  try {
    logger.info('Starting...');

    let lastCwd = process.cwd();
    do {
      let command = commands.shift();
      if (!command) break;

      command = command.trim();
      if (/^cd\s+/.test(command)) {
        execTimes++;
        // 如果包含cd字符，需要更新工作空间
        // 这个追加工作目录的逻辑参考了exeq的代码逻辑
        lastCwd = join(lastCwd, command.replace(/^cd\s+/, ''));
        continue;
      }

      if (parallel) {
        execSh(command, { cwd: lastCwd }, function(err) {
          if (err) {
            return kill(process.pid, function() {
              process.exit();
            });
          }
          execTimes++;
          if (execTimes >= count) {
            logger.success('Finished.');
            next && next();
          }
        });
      } else {
        await execShPromise(command, { cwd: lastCwd });
      }
    } while (true);

    if (!parallel) {
      logger.success('Finished.');
      next && next();
    }
  } catch (error) {
    logger.error(`Exit with code ${error.code}. ${error}`);
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

// 拦截退出信号
function onExitSignal() {
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      kill(process.pid, function() {
        process.exit();
      });
    });
  });
}
