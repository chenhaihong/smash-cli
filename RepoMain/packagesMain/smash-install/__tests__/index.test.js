const os = require('os');
const { resolve } = require('path');
const fse = require('fs-extra');
const autoMockSmashLogger = require('smash-helper-logger');
const smashInstall = require('../lib');

// auto mock ES6 class SmashLogger
jest.mock('smash-helper-logger');
// mock SmashInstall
const mockInstall = jest.fn(smashInstall);

const lastCwd = process.cwd();
const REPO_MIDDLEWARE = resolve(os.homedir(), '.smash-cli', 'middleware');
const ROOT = resolve(__dirname, '..'); // 包的根目录

jest.setTimeout(100e3);
beforeAll(() => {
  fse.emptyDirSync(REPO_MIDDLEWARE);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
});

describe('smash-install', () => {
  it('should install middlewares successfully', async (done) => {
    // 将工作空间临时迁到这个目录
    const DIR_FIXTURE_DEMO = resolve(ROOT, '__fixture__/demo-right');
    process.chdir(DIR_FIXTURE_DEMO);

    {
      // 首次安装
      await mockInstall();
      // 顺利调用安装函数
      expect(mockInstall).toBeCalled();

      const instance = autoMockSmashLogger.mock.instances[0];
      // 顺利输出安装中
      const mockInfo = instance.info;
      expect(mockInfo.mock.calls[0][0]).toMatch(/Installing\.\.\./);
      // 顺利输出安装成功
      const mockSuccess = instance.success;
      expect(mockSuccess.mock.calls[0][0]).toMatch(/Successfully installed\./);
    }

    {
      // 再次安装
      await mockInstall();
      // 顺利调用安装函数
      expect(mockInstall).toBeCalled();

      // 顺利输出已经安装过
      const instance = autoMockSmashLogger.mock.instances[1];
      // 顺利输出安装成功
      const mockInfo = instance.info;
      expect(mockInfo.mock.calls[0][0]).toMatch(/Already installed\./);
    }

    done();
  });

  it('should have errors while installing un-known middlewares', async (done) => {
    // 将工作空间临时迁到这个目录
    const DIR_FIXTURE_DEMO = resolve(ROOT, '__fixture__/demo-wrong');
    process.chdir(DIR_FIXTURE_DEMO);

    await mockInstall();
    expect(mockInstall).toBeCalled();

    // 输出“失败信息”
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockFail = instance.fail;
    expect(mockFail).toBeCalled();

    done();
  });
});
