const { resolve } = require('path');
const fse = require('fs-extra');
const copy = require('../lib');

const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..');
const FXITURE = resolve(ROOT, '__fixtures__/smash-project');
const DIST = resolve(FXITURE, 'dist');

beforeAll(() => {
  fse.removeSync(DIST);
  process.chdir(FXITURE);
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd);
  fse.removeSync(DIST);
});

const ctx = {};
const filesNotMatched = '/src/lib/*.js /dist/lib';
const filesGlob = [
  // files glob
  '/src/lib-a/*.js ---> /dist/lib',
  // dirs glob
  './src/lib-* --------> /dist/',
];
const filesUnknown = [
  // unknown files
  '/src/unknown-files.txt -> /dist/unknown-files.txt',
];
const filesKnown = [
  // files
  '/src/index.css -------> /dist/style/index.css',
  // dirs
  '/src/images -------> /dist/images',
];
const filesWithTplData = [
  // with tplData
  '/src/withTpl.txt ---> /dist/withTpl.txt',
];
const next = () => {};

const mockCopy = jest.fn(copy);
const mockNext = jest.fn(next);

describe('smash-middleware-copy', () => {
  it('should run well without any files', (done) => {
    mockCopy(ctx, {}, mockNext);
    done();
  });
  it('should not copy not-matched files', (done) => {
    mockCopy(ctx, { files: filesNotMatched }, mockNext);
    done();
  });
  it('should not copy unknown files', (done) => {
    mockCopy(ctx, { files: filesUnknown }, mockNext);
    done();
  });
  it('should copy glob files well', (done) => {
    mockCopy(ctx, { files: filesGlob }, mockNext);
    done();
  });
  it('should copy known files well', (done) => {
    mockCopy(ctx, { files: filesKnown }, mockNext);
    expect(mockNext).toBeCalled();
    done();
  });
  it('should copy with-tpl-data files well', (done) => {
    const tplData = { name: 'erye' };
    mockCopy(
      ctx,
      {
        files: filesWithTplData,
        tplData, // 模板数据
      },
      mockNext
    );
    done();
  });
});
