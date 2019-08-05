const chalk = require('chalk');

const name = 'smash';

module.exports = {
  log,
  info,
  warn,
  error,
};

function log() {
  console.log(name, chalk.blueBright('log'), chalk.blueBright(...arguments));
}

function info() {
  console.log(name, chalk.greenBright('info'), chalk.greenBright(...arguments));
}

function warn() {
  console.log(name, chalk.yellowBright('warn'), chalk.yellowBright(...arguments));
}

function error() {
  console.log(name, chalk.redBright('error'), chalk.redBright(...arguments));
}
