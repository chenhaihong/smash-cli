'use strict';

const { resolve } = require('path');
const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const smashInit = require('../lib');

const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');

const spyInfo = jest.spyOn(logger, 'info');
const spySuccess = jest.spyOn(logger, 'success');
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
  test('should init non-smash directory well', () => {
    expect.assertions(5);
    smashInit();

    expect(spyExistsSync).toBeCalled();

    expect(spyCopySync).toBeCalled();
    expect(spyCopySync.mock.calls[0]).toEqual([resolve(ROOT, '.defaultSmash'), resolve(TEMP, '.smash')]);

    // 验证输出信息，拷贝成功
    expect(spySuccess).toBeCalled();
    expect(spySuccess.mock.calls[0][0]).toMatch(/initialized successfully\./);
  });

  test('should not init task-file-existed directory successfully', () => {
    expect.assertions(3);
    smashInit();

    expect(spyExistsSync).toBeCalled();

    // 验证输出信息，拷贝失败
    expect(spyInfo).toBeCalled();
    expect(spyInfo.mock.calls[0][0]).toMatch(/task.yml existed\./);
  });
});
