const { join, resolve } = require('path');
const fse = require('fs-extra');
const clean = require('../lib');

const mockClean = jest.fn(clean);
const ctx = Object.create(null);
const dirsKnown = ['dest-a', './dest-b', '/dest-c', '\\dest-d'];
const dirsUnknown = [' ', 'dir_unknown'];
const next = () => {
  console.log('Hello next.');
};
const lastCwd = process.cwd();
const DIR_FIXTURE = resolve(__dirname, '../__fixtures__/smash-project');

beforeAll(() => {
  process.chdir(DIR_FIXTURE); // 将工作空间临时迁到这个目录
});

beforeEach(() => {
  setupFixture();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
});

describe('smash-middleware-clean', () => {
  it('should empty directories well', () => {
    const dirs = dirsKnown[0];
    mockClean(ctx, { dirs }, next);

    expect(mockClean).toBeCalled();
  });
  it('should empty directories well', () => {
    const dirs = [].concat(dirsKnown, dirsUnknown);
    mockClean(ctx, { dirs }, next);

    expect(mockClean).toBeCalled();
  });
  it('should remove directories well', () => {
    const dirs = [].concat(dirsKnown, dirsUnknown);
    mockClean(ctx, { dirs, remove: true }, next);

    expect(mockClean).toBeCalled();
  });
});

function setupFixture() {
  const src = resolve(DIR_FIXTURE, 'src');
  dirsKnown.forEach((dir) => {
    const dest = join(DIR_FIXTURE, dir);
    fse.copySync(src, dest);
  });
}
