const { homedir } = require('os');
const { resolve } = require('path');
const fse = require('fs-extra');

const HOME = homedir();
const REPO = resolve(HOME, '.smash-cli'); // 存放中间件与模板的仓库

// 清空仓库
fse.emptyDirSync(REPO);
