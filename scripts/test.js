const { join, resolve } = require('path');
const fse = require('fs-extra');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

let ROOT = resolve(__dirname, '../');
if (argv.package) {
  // 指定包测试
  ROOT = join(ROOT, argv.package);
  console.log(ROOT);
  if (!fse.pathExistsSync(ROOT)) {
    return console.log('路径不存在:', ROOT);
  }
}

const args = ['--runInBand', '--rootDir', ROOT];
console.log(`running: jest ${args.join(' ')}\n`);
require('jest').run(args);
