const os = require('os');
const { resolve } = require('path');
const fse = require('fs-extra');
const autoMockSmashLogger = require('smash-helper-logger');
const TaskFinder = require('smash-helper-task-finder');
const HMI = require('smash-helper-middleware-installer');
const smashInstall = require('../lib');

// auto mock ES6 class SmashLogger
jest.mock('smash-helper-logger');
// mock SmashInstall
const mockInstall = jest.fn(smashInstall);
// spy on smash-helper-task-finder
const spyGetTasks = jest.spyOn(TaskFinder, 'getTasks');
// spy on smash-helper-middleware-installer
const spyGetUnrepeatedMiddlewareSpecifiers = jest.spyOn(HMI, 'getUnrepeatedMiddlewareSpecifiers');
const spyManifest = jest.spyOn(HMI, 'manifest');
const spyHasInstalled = jest.spyOn(HMI, 'hasInstalled');
const spyInstall = jest.spyOn(HMI, 'install');
const spyResolveInstallationPath = jest.spyOn(HMI, 'resolveInstallationPath');
const spyWriteInstalledPath = jest.spyOn(HMI, 'writeInstalledPath');

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
    const DIR_FIXTURE_DEMO = resolve(ROOT, '__fixture__/demo-right-middleware');
    process.chdir(DIR_FIXTURE_DEMO);
    const tasks = {
      helloworld: [{ name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' }],
    };

    {
      // 首次安装
      await mockInstall();
      // 顺利调用安装函数
      expect(mockInstall).toBeCalled();
      expect(spyGetTasks.mock.results[0].value).toEqual(tasks);
      expect(spyGetUnrepeatedMiddlewareSpecifiers.mock.calls[0][0]).toEqual(tasks);
      expect(spyManifest.mock.calls[0][0]).toBe('smash-middleware-helloworld');
      expect(spyHasInstalled).toBeCalled();
      expect(spyInstall).toBeCalled();
      expect(spyResolveInstallationPath).toBeCalled();
      expect(spyWriteInstalledPath).toBeCalled();

      const instance = autoMockSmashLogger.mock.instances[0];
      // 顺利输出安装中
      const mockInfo = instance.info;
      expect(mockInfo.mock.calls[0][0]).toMatch(/Installing\.\.\./);
      // 顺利输出安装成功
      const mockSuccess = instance.success;
      expect(mockSuccess.mock.calls[0][0]).toMatch(/Successfully installed\./);
    }

    jest.clearAllMocks();

    {
      // 再次安装
      await mockInstall();
      // 顺利调用安装函数
      expect(mockInstall).toBeCalled();
      expect(spyGetTasks.mock.results[0].value).toEqual(tasks);
      expect(spyGetUnrepeatedMiddlewareSpecifiers.mock.calls[0][0]).toEqual(tasks);
      expect(spyManifest.mock.calls[0][0]).toBe('smash-middleware-helloworld');
      expect(spyHasInstalled).toBeCalled();
      expect(spyInstall).not.toBeCalled();
      expect(spyResolveInstallationPath).toBeCalled();
      expect(spyWriteInstalledPath).toBeCalled();

      // 顺利输出已经安装过
      const instance = autoMockSmashLogger.mock.instances[0];
      // 顺利输出安装成功
      const mockInfo = instance.info;
      expect(mockInfo.mock.calls[0][0]).toMatch(/Already installed\./);
    }

    done();
  });

  it('should show error while installing un-known middlewares', async (done) => {
    // 将工作空间临时迁到这个目录
    const DIR_FIXTURE_DEMO = resolve(ROOT, '__fixture__/demo-wrong-middleware');
    process.chdir(DIR_FIXTURE_DEMO);
    const tasks = {
      helloworld: [{ name: 'smash-middleware-unknown-hello-world', paramA: 'param a', paramB: 'param b' }],
    };

    {
      await mockInstall();
      expect(mockInstall).toBeCalled();
      expect(spyGetTasks.mock.results[0].value).toEqual(tasks);
      expect(spyGetUnrepeatedMiddlewareSpecifiers.mock.calls[0][0]).toEqual(tasks);
      expect(spyManifest.mock.calls[0][0]).toBe('smash-middleware-unknown-hello-world');
      expect(spyHasInstalled).not.toBeCalled();
      expect(spyInstall).not.toBeCalled();
      expect(spyResolveInstallationPath).not.toBeCalled();
      expect(spyWriteInstalledPath).not.toBeCalled();

      // 输出“失败信息”
      const instance = autoMockSmashLogger.mock.instances[0];
      const mockFail = instance.fail;
      expect(mockFail).toBeCalled();
    }

    done();
  });
});
