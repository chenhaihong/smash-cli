const { resolve } = require('path');
const fse = require('fs-extra');
const SmashCopy = require('../lib');

// params for SmashCopy
const ctx = {};
const filesNotMatched = '/src/lib/*.js /dist/lib';
const filesGlob = [
  // dirs glob
  './src/filesGlo* -----> /dist/',
  // files glob
  '/src/filesGlob/*.js -> /dist/filesGlobJavascript',
];
const filesUnknown = [
  // unknown files
  '/src/filesUnknown/unknown-files.txt -> /dist/unknown-files.txt',
];
const filesKnown = [
  // dirs
  '/src/filesKnown -----------> /dist/filesKnown',
  // files
  '/src/filesKnown/index.css -> /dist/filesKnownCSS/index.css',
];
const filesWithTplData = [
  // dirs with tplData
  '/src/filesWithTplData -------------> /dist/filesWithTplData',
  // files with tplData
  '/src/filesWithTplData/withTpl.txt -> /dist/filesWithTplDataTXT/withTpl.txt',
];
const next = () => {};

// mock next
const mockNext = jest.fn(next);
// spy on fs-extra
const spyPathExistsSync = jest.spyOn(fse, 'pathExistsSync');
const spyCopySync = jest.spyOn(fse, 'copySync');
const spyStatSync = jest.spyOn(fse, 'statSync');
const spyReaddirSync = jest.spyOn(fse, 'readdirSync');
const spyReadFileSync = jest.spyOn(fse, 'readFileSync');
const spyWriteFileSync = jest.spyOn(fse, 'writeFileSync');

// cwd variables for setup
const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..');
const FIXTURE = resolve(ROOT, '__fixtures__/smash-project');
const DIST = resolve(FIXTURE, 'dist');

beforeAll(() => {
  // 所有的文件都会被拷贝到dist目录下
  fse.removeSync(DIST);
  process.chdir(FIXTURE);
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd);
  fse.removeSync(DIST);
});

describe('smash-middleware-copy', () => {
  it('should run well without any files', (done) => {
    SmashCopy(ctx, {}, mockNext);
    done();
  });
  it('should not copy not-matched files', (done) => {
    SmashCopy(ctx, { files: filesNotMatched }, mockNext);
    done();
  });
  it('should not copy unknown files', (done) => {
    SmashCopy(ctx, { files: filesUnknown }, mockNext);
    done();
  });
  it('should copy glob files well', (done) => {
    SmashCopy(ctx, { files: filesGlob }, mockNext);
    done();
  });
  it('should copy known files well', (done) => {
    SmashCopy(ctx, { files: filesKnown }, mockNext);
    expect(mockNext).toBeCalled();
    done();
  });
  it('should copy with-tpl-data files well', (done) => {
    const tplData = { name: 'erye' };
    SmashCopy(
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
