const { resolve } = require('path');
const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const smashInstall = require('../lib');

const lastCwd = process.cwd();
const TEMP = resolve(lastCwd, 'temp');

const spySuccess = jest.spyOn(logger, 'success');
const spyFail = jest.spyOn(logger, 'fail');
const spyInstall = jest.fn(smashInstall);

beforeAll(() => {
  fse.emptyDirSync(TEMP);
  process.chdir(TEMP); // 将工作空间临时迁到这个目录
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
  fse.removeSync(TEMP); // 重置工作空间后，才能接触对temp目录的占用，然后可删除生成的配置文件
});

// {
//   // 修改工作目录到./temp目录
//   const wd = path.resolve(__dirname, './temp');
//   fse.ensureDirSync(wd);
//   process.chdir(wd);

//   // 测试安装模板方法
//   smashInstall('smash-middleware-helloworld');
// }

describe('smash-install', () => {
  test('should install well', async () => {
    expect.assertions(3);

    const tplName = 'smash-middleware-helloworld';
    await smashInstall(tplName);

    expect(spyInstall).toBeCalled();
    expect(spyInstall.mock.calls[0][0]).toBe(tplName);

    expect(spySuccess).toBeCalled();
  });

  test('should not install well', () => {
    expect.assertions(3);

    const tplName = 'smsah-waremiddle-helloworld';
    await smashInstall(tplName);

    expect(spyInstall).toBeCalled();
    expect(spyInstall.mock.calls[0][0]).toBe(tplName);

    expect(spyFail).toBeCalled();
  });
});
