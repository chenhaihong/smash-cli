const { resolve } = require('path');
const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const smashInstall = require('../lib');

const lastCwd = process.cwd();
const TEMP = resolve(lastCwd, 'temp');

const spySuccess = jest.spyOn(logger, 'success');
const spyFail = jest.spyOn(logger, 'fail');
const spyCopySync = jest.spyOn(fse, 'copySync');
const mockInstall = jest.fn(smashInstall);

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

describe('smash-install', () => {
  test('should install well', async () => {
    expect.assertions(4);

    const tplName = 'smash-template-react';
    await mockInstall(tplName);

    expect(mockInstall).toBeCalled();
    expect(mockInstall.mock.calls[0][0]).toBe(tplName);

    expect(spyCopySync).toBeCalled();

    expect(spySuccess).toBeCalled();
  });

  test('should not install well', async () => {
    expect.assertions(3);

    const tplName = 'smsah-waremiddle-helloworld';
    await mockInstall(tplName);

    expect(mockInstall).toBeCalled();
    expect(mockInstall.mock.calls[0][0]).toBe(tplName);

    expect(spyFail).toBeCalled();
  });
});
