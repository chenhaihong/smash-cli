'use strict';

const chalk = require('chalk');

module.exports = class Logger {
  constructor(name = 'smash') {
    this.name = name;
  }

  /**
   * 输出普通提示
   * @param  {...String} params 要输出的信息
   * @returns {void}
   */
  log(...params) {
    console.log(this.name, chalk.blueBright('log'), ...params); // eslint-disable-line
  }

  /**
   * 输出信息
   * @param  {...String} params 要输出的信息
   * @returns {void}
   */
  info(...params) {
    console.log(this.name, chalk.greenBright('info'), ...params); // eslint-disable-line
  }

  /**
   * 输出警告
   * @param  {...String} params 要输出的信息
   * @returns {void}
   */
  warn(...params) {
    console.log(this.name, chalk.yellowBright('warn'), ...params); // eslint-disable-line
  }

  /**
   * 输出错误
   * @param  {...String} params 要输出的信息
   * @returns {void}
   */
  error(...params) {
    console.log(this.name, chalk.redBright('error'), ...params); // eslint-disable-line
  }

  /**
   * 输出成功提示
   * @param  {...String} params 要输出的信息
   * @returns {void}
   */
  success(...params) {
    console.log(this.name, chalk.greenBright('success'), ...params); // eslint-disable-line
  }

  /**
   * 输出失败提示
   * @param  {...String} params 要输出的信息
   * @returns {void}
   */
  fail(...params) {
    console.log(this.name, chalk.redBright('fail'), ...params); // eslint-disable-line
  }
};
