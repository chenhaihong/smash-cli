const { resolve } = require('path');
const os = require('os');

const fse = require('fs-extra');

const autoMockSmashLogger = require('smash-helper-logger');
const TaskFinder = require('smash-helper-task-finder');
const HMI = require('smash-helper-middleware-installer');

const smashRun = require('../lib');
const QueueRunner = require('../lib/QueueRunner');

// auto mock smash-helper-logger
jest.mock('smash-helper-logger');
// spy on smash-helper-task-finder
const spyGetMiddlewareQueue = jest.spyOn(TaskFinder, 'getMiddlewareQueue');
// spy on smash-helper-middleware-installer
const spyReadInstalledPath = jest.spyOn(HMI, 'readInstalledPath');
// spy on QuereRunner
const spyDequeue = jest.spyOn(QueueRunner, 'dequeue');
// mock smash-run
const mockSmashRun = jest.fn(smashRun);

const lastCwd = process.cwd();
const DIR_FIXTURE = resolve(__dirname, '../__fixtures__/smash-project');
const REPO = resolve(os.homedir(), '.smash-cli/middleware');

jest.setTimeout(100e3);

beforeAll(() => {
  fse.emptyDirSync(REPO); // 清空中间件仓库
  process.chdir(DIR_FIXTURE); // 将工作空间临时迁到这个目录
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
  // fse.emptyDirSync(REPO); // 清空中间件仓库
});

describe('smash-run', () => {
  describe('known task', () => {
    const taskName = 'helloworld';
    const middlewareQueue = [
      {
        name: 'smash-middleware-helloworld',
        paramA: 'param a',
        paramB: 'param b',
      },
    ];
    const specifier = 'smash-middleware-helloworld';
    it('should show error without installed middlewares', async (done) => {
      await mockSmashRun(taskName);
      expect(mockSmashRun).toBeCalled();

      expect(spyGetMiddlewareQueue.mock.calls[0][0]).toBe(taskName);
      expect(spyGetMiddlewareQueue.mock.results[0].value).toEqual(middlewareQueue);

      const instance = autoMockSmashLogger.mock.instances[0];
      const mockFail = instance.fail;
      expect(mockFail.mock.calls[0][0]).toBe(
        `Middleware ${specifier} hasn't been installed. Run \`smash install\` to install it.`
      );

      done();
    });
    it('should run well with installed middlewares', async (done) => {
      {
        // 安装中间件
        const { name, version } = await HMI.manifest(specifier);
        await HMI.install(name, version);
        const installedPath = HMI.resolveInstallationPath(name, version);
        HMI.writeInstalledPath(specifier, installedPath);
      }

      await mockSmashRun(taskName);
      expect(mockSmashRun).toBeCalled();

      expect(spyGetMiddlewareQueue).toBeCalled();

      expect(spyReadInstalledPath.mock.calls.length).toBe(1);
      expect(spyReadInstalledPath.mock.calls[0][0]).toBe(specifier);

      expect(spyDequeue).toBeCalled();

      done();
    });
  });

  describe('un-known task', () => {
    it('should show error', async (done) => {
      const unknownTaskName = 'dlrowolleh';

      await mockSmashRun(unknownTaskName);
      expect(mockSmashRun).toBeCalled();

      expect(spyGetMiddlewareQueue).toBeCalled();

      // DIR_FIXTURE smash-demo的配置文件里面，没有定义这一个任务。
      // 不会运行未定义的task
      expect(spyReadInstalledPath).not.toBeCalled();
      expect(spyDequeue).not.toBeCalled();

      // 直接进入未找到任务的分支，输出错误信息
      const instance = autoMockSmashLogger.mock.instances[0];
      const mockFail = instance.fail;
      expect(mockFail).toBeCalled();
      expect(mockFail.mock.calls[0][0]).toBe(`Task not found: ${unknownTaskName}.`);

      done();
    });
  });
});
