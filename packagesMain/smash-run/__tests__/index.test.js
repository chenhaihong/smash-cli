const { resolve } = require('path');
const os = require('os');

const fse = require('fs-extra');
const autoMockSmashLogger = require('smash-helper-logger');
const pacote = require('pacote');

const smashRun = require('../lib');
const TaskFinder = require('../lib/TaskFinder');
const MiddlewareInstaller = require('../lib/MiddlewareInstaller');
const QueueRunner = require('../lib/QueueRunner');

// auto mock SmashLogger
jest.mock('smash-helper-logger');
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

const lastCwd = process.cwd();
const DIR_FIXTURE = resolve(__dirname, '../__fixtures__/smash-project');
const REPO = resolve(os.homedir(), '.smash-cli/middleware');

beforeAll(() => {
  fse.emptyDirSync(REPO); // 清空中间件仓库
  fse.ensureDirSync(DIR_FIXTURE);
  process.chdir(DIR_FIXTURE); // 将工作空间临时迁到这个目录
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
  fse.emptyDirSync(REPO); // 清空中间件仓库
});

describe('smash-run', () => {
  it('should run known task and install first-time-run middleware', async (done) => {
    await mockSmashRun('helloworld');

    // should run known task well
    expect(mockSmashRun).toBeCalled();
    expect(spyGetMiddlewareQueue).toBeCalled();
    expect(spyGetInstalledPaths).toBeCalled();
    expect(spyDequeue).toBeCalled();

    // should install first-time-run middleware
    // 首次使用中间件需要安装，会执行pacote提取的函数
    expect(spyExtract).toBeCalled();
    // 验证提取过程，SmashLogger输出的信息
    // SmashLogger总共实例化了2次，这里验证第2个实例
    const instance = autoMockSmashLogger.mock.instances[1];
    const mockInfo = instance.info;
    const mockSuccess = instance.success;
    expect(mockInfo.mock.calls.length).toBe(2);
    expect(mockInfo.mock.calls[0][0]).toMatch(/Extracting\.\.\./);
    expect(mockInfo.mock.calls[1][0]).toMatch(/Installing dependencies\.\.\./);
    expect(mockSuccess.mock.calls[0][0]).toMatch(/Installed\./);

    done();
  });

  it('should not run unknown task well', async (done) => {
    const taskUnknown = 'dlrowolleh';
    await mockSmashRun(taskUnknown);

    expect(mockSmashRun).toBeCalled();
    expect(spyGetMiddlewareQueue).toBeCalled();

    // DIR_FIXTURE smash-demo的配置文件里面，没有定义这一个任务。
    // 不会运行未定义的task
    expect(spyGetInstalledPaths).not.toBeCalled();
    expect(spyDequeue).not.toBeCalled();

    // 直接进入未找到任务的分支，输出错误信息
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockFail = instance.fail;
    expect(mockFail).toBeCalled();
    expect(mockFail.mock.calls[0][0]).toMatch(/^Task not found/);

    done();
  });

  it('should not re-install not-first-time-run middleware', async (done) => {
    await mockSmashRun('helloworld');

    expect(mockSmashRun).toBeCalled();
    expect(spyGetMiddlewareQueue).toBeCalled();

    // 再次使用中间件，
    // 获取安装路径时，不需要再次安装中间件，也就是不会执行pacote的提取函数
    expect(spyGetInstalledPaths).toBeCalled();
    expect(spyExtract).not.toBeCalled();

    done();
  });

  it('should not run known task with unknown middleware sucessfully', async (done) => {
    await mockSmashRun('task-with-unknown-middleware'); // 运行包含不存在中间件的task

    expect(spyGetMiddlewareQueue).toBeCalled();

    expect(spyGetInstalledPaths).toBeCalled(); // 代码执行到这里后，代码必须报错，才是正常的结果
    expect(spyExtract).not.toBeCalled(); // 因为不存在中间件，所以不会进入下载中间件的逻辑

    expect(spyDequeue).not.toBeCalled(); // 不会执行中间件队列任务

    // 直接进入错误分支，输出错误信息
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockFail = instance.fail;
    expect(mockFail).toBeCalled();

    done();
  });
});
