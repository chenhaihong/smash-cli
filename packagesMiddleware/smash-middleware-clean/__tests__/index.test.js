const { join, resolve } = require('path');
const fse = require('fs-extra');
const SmashClean = require('../lib');

// params for SmashClean
const ctx = Object.create(null);
const dirsKnown = ['dir_known'];
const dirsUnknown = ['dir_unknown'];
const next = () => {};

// spy on fs-extra
const spyPathExistsSync = jest.spyOn(fse, 'pathExistsSync');
const spyRemoveSync = jest.spyOn(fse, 'removeSync');
const spyEmptyDirSync = jest.spyOn(fse, 'emptyDirSync');
// mock next
const mockNext = jest.fn(next);

const lastCwd = process.cwd();
const DIR_FIXTURE = resolve(__dirname, '../__fixtures__/smash-project');

beforeAll(() => {
  process.chdir(DIR_FIXTURE); // 将工作空间临时迁到这个目录
});

beforeEach(() => {
  setupFixture();
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
});

describe('smash-middleware-clean', () => {
  describe('without dirs', () => {
    it('should not run remove or empty', () => {
      SmashMiddlewareClean(ctx, {}, mockNext);

      expect(spyPathExistsSync).not.toBeCalled();
      expect(spyRemoveSync).not.toBeCalled();
      expect(spyEmptyDirSync).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
  });
  describe('with empty-string dirs', () => {
    it('should not run remove or empty', () => {
      const dirs = ['', ' '];
      SmashMiddlewareClean(ctx, { dirs }, mockNext);

      expect(spyPathExistsSync).not.toBeCalled();
      expect(spyRemoveSync).not.toBeCalled();
      expect(spyEmptyDirSync).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
  });
  describe('with unknown dirs', () => {
    it('should not run remove or empty', () => {
      SmashMiddlewareClean(ctx, { dirs: dirsUnknown }, mockNext);

      expect(spyPathExistsSync).toBeCalled();
      expect(spyRemoveSync).not.toBeCalled();
      expect(spyEmptyDirSync).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
  });
  describe('with known dirs', () => {
    it('should empty directories well', () => {
      const dirs = dirsKnown[0];
      SmashClean(ctx, { dirs }, next);

      expect(spyPathExistsSync).toBeCalled();
      expect(spyEmptyDirSync).toBeCalled();
      expect(spyRemoveSync).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
    it('should remove directories well', () => {
      const dirs = dirsKnown;
      SmashClean(ctx, { dirs, remove: true }, next);

      expect(spyPathExistsSync).toBeCalled();
      expect(spyEmptyDirSync).not.toBeCalled();
      expect(spyRemoveSync).toBeCalled();
      expect(mockNext).toBeCalled();
    });
  });
});

/**
 * 搭建用来测试删除功能的文件
 */
function setupFixture() {
  const src = resolve(DIR_FIXTURE, 'src');
  dirsKnown.forEach((dir) => {
    const dest = join(DIR_FIXTURE, dir);
    fse.copySync(src, dest);
  });
}
