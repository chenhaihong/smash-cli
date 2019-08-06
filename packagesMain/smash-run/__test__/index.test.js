const { resolve } = require('path');
const logger = require('smash-helper-logger');
const smashRun = require('../lib');
const TaskFinder = require('../lib/TaskFinder');
const MiddlewareInstaller = require('../lib/MiddlewareInstaller');
const QueueRunner = require('../lib/QueueRunner');

const lastCwd = process.cwd();
const TEMP = resolve(lastCwd, 'temp');

const spyWarn = jest.spyOn(logger, 'warn');
const spyError = jest.spyOn(logger, 'error');
const spySuccess = jest.spyOn(logger, 'success');
const spyFail = jest.spyOn(logger, 'fail');
const mockRun = jest.fn(smashRun);

beforeAll(() => {
  fse.emptyDirSync(TEMP);
  process.chdir(TEMP); // 将工作空间临时迁到这个目录
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
  fse.removeSync(TEMP); // 重置工作空间后，才能解除对temp目录的占用，然后可删除生成的配置文件
});

describe('smash-run', () => {
  it('should run well', () => {
    mockRun('helloworld');

    expect(mockRun).toBeCalled();
  });

  // it('should not run well', () => {

  // });
});
