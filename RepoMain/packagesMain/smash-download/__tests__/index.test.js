const { resolve } = require('path');
const fse = require('fs-extra');
const autoMockSmashLogger = require('smash-helper-logger');
const smashDownload = require('../lib');

// auto mock ES6 class SmashLogger
jest.mock('smash-helper-logger');
// mock smashDownload
const mockDownload = jest.fn(smashDownload);
// spy on fs-extra
const spyCopySync = jest.spyOn(fse, 'copySync');

const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');

beforeAll(() => {
  fse.emptyDirSync(TEMP);

  // TODO 突然出现，切换工作空间无效的问题。
  // 将工作空间临时迁到这个目录
  process.chdir(TEMP);
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
    await mockDownload(tplName);

    // 顺利调用安装函数
    expect(mockDownload).toBeCalled();
    expect(mockDownload.mock.calls[0][0]).toBe(tplName);

    // 顺利拷贝模板
    expect(spyCopySync).toBeCalled();

    // 顺利输出“提示成功信息”
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockSuccess = instance.success;
    expect(mockSuccess.mock.calls[0][0]).toMatch(/Successfully installed/);
    done();
  });

  it('should not install unknown package', async (done) => {
    expect.assertions(3);

    const tplName = 'smsah-waremiddle-worldhello';
    await mockDownload(tplName);

    expect(mockDownload).toBeCalled();
    expect(mockDownload.mock.calls[0][0]).toBe(tplName);

    // 输出“失败信息”
    const instance = autoMockSmashLogger.mock.instances[0];
    const mockFail = instance.fail;
    expect(mockFail).toBeCalled();

    done();
  });

  // TODO 缺少断网环境下的测试用例
  // it('should not install well without network', async (done) => {});
});
