const { join, resolve } = require('path');
const fse = require('fs-extra');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

let rootDir = resolve(__dirname, '..');
if (!argv.package) {
  return console.log('必须指定包测试');
}

rootDir = join(rootDir, argv.package);
if (!fse.pathExistsSync(rootDir)) {
  return console.log('路径不存在:', rootDir);
}

console.log('testing:', rootDir);

const args = [
  '--runInBand', //顺序执行
  '--config',
  resolve(__dirname, '../jest.config.middleware.js'),
  `--rootDir`,
  rootDir,
];
console.log(`running: jest ${args.join(' ')}\n`);
require('jest').run(args);
