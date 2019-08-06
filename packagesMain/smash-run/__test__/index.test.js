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
const mockRun = jest.fn(smashRun);

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
  it('should run known task well', async () => {
    await mockRun('helloworld');

    expect(mockRun).toBeCalled();

    expect(spyGetMiddlewareQueue).toBeCalled();
    expect(spyGetInstalledPaths).toBeCalled();

    // 首次使用中间件需要安装
    expect(spyExtract).toBeCalled();
    expect(spySuccess).toBeCalled();
    expect(spyDequeue).toBeCalled();
  });

  it('should not run unknown task', async () => {
    await mockRun('worldhello');

    expect(spyWarn).toBeCalled();
    expect(spyWarn.mock.calls[0]).toContain('task not found.');
  });

  it('should not re-install smash-middleware-helloworld middleware', async () => {
    await mockRun('helloworld');

    // 再次使用中间件不需要安装
    expect(spyExtract).not.toBeCalled();
  });

  it('should not run task well with unknown middleware', async () => {
    await mockRun('task-with-unknown-middleware');

    expect(spyGetMiddlewareQueue).toBeCalled();
    expect(spyGetInstalledPaths).toBeCalled(); // 执行到这里后，代码必须报错，才是正常的结果

    expect(spyExtract).not.toBeCalled();
    expect(spyDequeue).not.toBeCalled();

    expect(spyError).toBeCalled();
  });
});
