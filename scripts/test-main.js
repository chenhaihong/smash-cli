const { join, resolve } = require('path');
const fse = require('fs-extra');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

let rootDir = resolve(__dirname, '../');
if (argv.package) {
  // 指定包测试
  rootDir = join(rootDir, argv.package);
  console.log('testing:', rootDir);
  if (!fse.pathExistsSync(rootDir)) {
    return console.log('路径不存在:', rootDir);
  }
}

const args = [
  '--runInBand', //顺序执行
  '--config',
  resolve(__dirname, '../jest.config.js'),
  `--rootDir`,
  rootDir,
];
console.log(`running: jest ${args.join(' ')}\n`);
require('jest').run(args);
