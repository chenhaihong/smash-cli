const path = require('path');
const fse = require('fs-extra');
const smashInstall = require('../lib');

// {
//   // 修改工作目录到./temp目录
//   const wd = path.resolve(__dirname, './temp');
//   fse.ensureDirSync(wd);
//   process.chdir(wd);

//   // 测试安装模板方法
//   smashInstall('smash-middleware-helloworld');
// }

describe('smash-install', () => {
  test('should install well', () => {});
});
