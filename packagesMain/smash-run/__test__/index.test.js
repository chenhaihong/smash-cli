const { resolve } = require('path');
const os = require('os');

const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const pacote = require('pacote');
const smashInit = require('smash-init');

const smashRun = require('../lib');
const TaskFinder = require('../lib/TaskFinder');
const MiddlewareInstaller = require('../lib/MiddlewareInstaller');
const QueueRunner = require('../lib/QueueRunner');

const lastCwd = process.cwd();
const TEMP = resolve(lastCwd, 'temp');
const REPO = resolve(os.homedir(), '.smash-cli/middleware');

// spy on logger
const spyWarn = jest.spyOn(logger, 'warn');
const spyError = jest.spyOn(logger, 'error');
const spySuccess = jest.spyOn(logger, 'success');
// spy on TaskFinder
const spyGetMiddlewareQueue = jest.spyOn(TaskFinder, 'getMiddlewareQueue');
// spy on MiddlewareInstaller
const spyGetInstalledPaths = jest.spyOn(MiddlewareInstaller, 'getInstalledPaths');
// spy on pacote
const spyExtract = jest.spyOn(pacote, 'extract');
// spy on QuereRunner
const spyDequeue = jest.spyOn(QueueRunner, 'dequeue');
// mock smash-run
const mockSmashRun = jest.fn(smashRun);

beforeAll(() => {
  fse.emptyDirSync(REPO); // 清空中间件仓库
  fse.emptyDirSync(TEMP);
  process.chdir(TEMP); // 将工作空间临时迁到这个目录
  smashInit();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
  fse.removeSync(TEMP); // 重置工作空间后，才能解除对temp目录的占用
  fse.emptyDirSync(REPO); // 清空中间件仓库
});

describe('smash-run', () => {
  it('should run known task and install first-time-run middleware', async () => {
    await mockSmashRun('helloworld');

    // should run known task well
    expect(mockSmashRun).toBeCalled();
    expect(spyGetMiddlewareQueue).toBeCalled();
    expect(spyDequeue).toBeCalled();

    // should install first-time-run middleware
    // 首次使用中间件需要安装
    expect(spyGetInstalledPaths).toBeCalled();
    expect(spyExtract).toBeCalled();
    expect(spySuccess).toBeCalled();
  });

  it('should not run unknown task well', async () => {
    await mockSmashRun('worldhello');

    expect(mockSmashRun).toBeCalled();
    expect(spyGetMiddlewareQueue).toBeCalled();

    // 不会运行未知的task
    expect(spyGetInstalledPaths).not.toBeCalled();
    expect(spyDequeue).not.toBeCalled();

    // 直接进入错误分支，输出错误信息
    expect(spyWarn).toBeCalled();
    expect(spyWarn.mock.calls[0]).toContain('task not found.');
  });

  it('should not re-install not-first-time-run middleware', async () => {
    await mockSmashRun('helloworld');

    expect(mockSmashRun).toBeCalled();
    expect(spyGetMiddlewareQueue).toBeCalled();

    // 再次使用中间件不需要安装
    expect(spyGetInstalledPaths).toBeCalled();
    expect(spyExtract).not.toBeCalled();
  });

  it('should not run known task with unknown middleware sucessfully', async () => {
    await mockSmashRun('task-with-unknown-middleware'); // 运行未知task

    expect(spyGetMiddlewareQueue).toBeCalled();
    expect(spyGetInstalledPaths).toBeCalled(); // 代码执行到这里后，代码必须报错，才是正常的结果

    expect(spyExtract).not.toBeCalled(); // 因为不存在中间件，所以不会进入下载中间件的逻辑
    expect(spyDequeue).not.toBeCalled(); // 不会执行中间件队列任务

    expect(spyError).toBeCalled(); // 捕获异常时，通过logger.error输出了错误信息
  });
});
