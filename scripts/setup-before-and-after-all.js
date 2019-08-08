const os = require('os');
const { resolve } = require('path');
const fse = require('fs-extra');

const HOME = os.homedir();
const REPO = resolve(HOME, '.smash-cli'); // 存放中间件与模板的仓库

// 清空仓库
beforeAll(() => {
  fse.emptyDirSync(REPO);
});

afterAll(() => {
  fse.emptyDirSync(REPO);
});
