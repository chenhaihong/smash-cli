'use strict';

const chalk = require('chalk');

const _name = 'smash';

module.exports = {
  log,
  info,
  warn,
  error,
  success,
  fail,
};

/**
 * 输出普通提示
 * @param  {...any} params 要输出的信息
 * @returns {void}
 */
function log(...params) {
  console.log(_name, chalk.blueBright('log'), ...params); // eslint-disable-line
}

/**
 * 输出信息
 * @param  {...any} params 要输出的信息
 * @returns {void}
 */
function info(...params) {
  console.log(_name, chalk.greenBright('info'), ...params); // eslint-disable-line
}

/**
 * 输出警告
 * @param  {...any} params 要输出的信息
 * @returns {void}
 */
function warn(...params) {
  console.log(_name, chalk.yellowBright('warn'), ...params); // eslint-disable-line
}

/**
 * 输出错误
 * @param  {...any} params 要输出的信息
 * @returns {void}
 */
function error(...params) {
  console.log(_name, chalk.redBright('error'), ...params); // eslint-disable-line
}

/**
 * 输出成功提示
 * @param  {...any} params 要输出的信息
 * @returns {void}
 */
function success(...params) {
  console.log(_name, chalk.greenBright('success'), ...params); // eslint-disable-line
}

/**
 * 输出失败提示
 * @param  {...any} params 要输出的信息
 * @returns {void}
 */
function fail(...params) {
  console.log(_name, chalk.redBright('fail'), ...params); // eslint-disable-line
}
