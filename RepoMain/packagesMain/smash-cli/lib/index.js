const smashInit = require('smash-init');
const smashDownload = require('smash-download');
const smashInstall = require('smash-install');
const smashRun = require('smash-run');

const programmaticSmash = {
  init: smashInit,
  download: smashDownload,
  install: smashInstall,
  run: smashRun,
};

module.exports = programmaticSmash;
