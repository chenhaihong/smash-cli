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
  console.log(_name, chalk.blueBright('log'), ...arguments); // eslint-disable-line
}

/**
 *
 */
function info() {
  console.log(_name, chalk.greenBright('info'), ...arguments); // eslint-disable-line
}

/**
 *
 */
function warn() {
  console.log(_name, chalk.yellowBright('warn'), ...arguments); // eslint-disable-line
}

/**
 *
 */
function error() {
  console.log(_name, chalk.redBright('error'), ...arguments); // eslint-disable-line
}

/**
 *
 */
function success() {
  console.log(_name, chalk.greenBright('success'), ...arguments); // eslint-disable-line
}

/**
 *
 */
function fail() {
  console.log(_name, chalk.redBright('fail'), ...arguments); // eslint-disable-line
}
