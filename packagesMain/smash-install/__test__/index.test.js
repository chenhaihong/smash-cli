const { resolve } = require('path');
const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const smashInstall = require('../lib');

const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');

const mockInstall = jest.fn(smashInstall);
const spyCopySync = jest.spyOn(fse, 'copySync');
const spySuccess = jest.spyOn(logger, 'success');
const spyFail = jest.spyOn(logger, 'fail');

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

describe('smash-install', () => {
  it('should install known template successfully', async (done) => {
    expect.assertions(4);

    // 因为要覆盖到拷贝冗余文件的逻辑，
    // 所以选这个包
    const tplName = 'smash-template-react';
    await mockInstall(tplName);

    expect(mockInstall).toBeCalled();
    expect(mockInstall.mock.calls[0][0]).toBe(tplName);

    expect(spyCopySync).toBeCalled();

    expect(spySuccess).toBeCalled();

    done();
  });

  it('should not install unknown package well', async (done) => {
    expect.assertions(3);

    const tplName = 'smsah-waremiddle-worldhello';
    await mockInstall(tplName);

    expect(mockInstall).toBeCalled();
    expect(mockInstall.mock.calls[0][0]).toBe(tplName);

    expect(spyFail).toBeCalled();

    done();
  });

  // TODO 缺少断网环境下的测试用例
  // it('should not install well without network', async (done) => {});
});
