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
 *
 */
function log() {
  console.log(_name, chalk.blueBright('log'), chalk.blueBright(...arguments)); // eslint-disable-line
}

/**
 *
 */
function info() {
  console.log(_name, chalk.greenBright('info'), chalk.greenBright(...arguments)); // eslint-disable-line
}

/**
 *
 */
function warn() {
  console.log(_name, chalk.yellowBright('warn'), chalk.yellowBright(...arguments)); // eslint-disable-line
}

/**
 *
 */
function error() {
  console.log(_name, chalk.redBright('error'), chalk.redBright(...arguments)); // eslint-disable-line
}

/**
 *
 */
function success() {
  console.log(_name, chalk.greenBright('success'), chalk.greenBright(...arguments)); // eslint-disable-line
}

/**
 *
 */
function fail() {
  console.log(_name, chalk.redBright('fail'), chalk.redBright(...arguments)); // eslint-disable-line
}
