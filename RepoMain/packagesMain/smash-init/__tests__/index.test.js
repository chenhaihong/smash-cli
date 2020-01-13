'use strict';

const { resolve } = require('path');
const fse = require('fs-extra');
const autoMockSmashLogger = require('smash-helper-logger');
const smashInit = require('../lib');

//  auto mock ES6 class SmashLogger
jest.mock('smash-helper-logger');

const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');

// spy on fs-extra
const spyCopySync = jest.spyOn(fse, 'copySync');
const spyExistsSync = jest.spyOn(fse, 'pathExistsSync');

beforeAll(() => {
  fse.emptyDirSync(TEMP);
  process.chdir(TEMP); // 将工作空间临时迁到这个目录
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
  fse.removeSync(TEMP); // 重置工作空间后，才能解除对temp目录的占用
});

describe('smash-init', () => {
  test('should initialize non-smash directory well', () => {
    expect.assertions(6);
    smashInit();

    expect(spyExistsSync).toBeCalled();

    expect(spyCopySync).toBeCalled();
    expect(spyCopySync.mock.calls[0]).toEqual([resolve(ROOT, '.defaultSmash'), resolve(TEMP, '.smash')]);

    // 验证输出信息，拷贝成功
    expect(autoMockSmashLogger).toBeCalled();
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockSuccess = instance.success;
    expect(mockSuccess).toBeCalled();
    expect(mockSuccess.mock.calls[0][0]).toMatch(/Initialized successfully\./);
  });

  test('should not initialize task-file-existed directory successfully', () => {
    expect.assertions(4);
    smashInit();

    expect(spyExistsSync).toBeCalled();

    // 验证输出信息，拷贝失败
    expect(autoMockSmashLogger).toBeCalled();
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockFail = instance.fail;
    expect(mockFail).toBeCalled();
    expect(mockFail.mock.calls[0][0]).toMatch(/Task.yml existed\./);
  });
});
