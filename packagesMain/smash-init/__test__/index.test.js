'use strict';

const { resolve } = require('path');
const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const smashInit = require('../lib');

const lastCwd = process.cwd();
const TEMP = resolve(lastCwd, 'temp');
const ROOT = resolve(__dirname, '..');

const spyInfo = jest.spyOn(logger, 'info');
const spySuccess = jest.spyOn(logger, 'success');
const spyCopy = jest.spyOn(fse, 'copySync');
const spyExists = jest.spyOn(fse, 'pathExistsSync');

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

describe('smash-init', () => {
  test('should init well', () => {
    expect.assertions(5);
    smashInit();

    expect(spyExists).toBeCalled();

    expect(spyCopy).toBeCalled();
    expect(spyCopy.mock.calls[0]).toEqual([
      resolve(ROOT, '.defaultSmash'),
      resolve(TEMP, '.smash'),
    ]);

    // 验证输出信息，拷贝成功
    expect(spySuccess).toBeCalled();
    expect(spySuccess.mock.calls[0][0]).toMatch(/initialized successfully\./);
  });

  test('should not init successfully while a task file existed', () => {
    expect.assertions(3);
    smashInit();

    expect(spyExists).toBeCalled();

    // 验证输出信息，拷贝失败
    expect(spyInfo).toBeCalled();
    expect(spyInfo.mock.calls[0][0]).toMatch(/task.yml existed\./);
  });
});
