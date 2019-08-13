const fse = require('fs-extra');
const glob = require('glob');
jest.mock('smash-helper-logger');
const autoMockSmashLogger = require('smash-helper-logger');
const SmashCopy = require('../lib');

// autoMockSmashLogger instance
const mockInstance = autoMockSmashLogger.mock.instances[0];
const mockInfo = mockInstance.info;
// spy on glob
const spyGlob = jest.spyOn(glob, 'Glob');
// spy on fs-extra
const spyPathExistsSync = jest.spyOn(fse, 'pathExistsSync');
const spyCopySync = jest.spyOn(fse, 'copySync');
const spyStatSync = jest.spyOn(fse, 'statSync');
const spyReaddirSync = jest.spyOn(fse, 'readdirSync');
const spyReadFileSync = jest.spyOn(fse, 'readFileSync');
const spyWriteFileSync = jest.spyOn(fse, 'writeFileSync');
// mock next
const mockNext = jest.fn(() => {});

require('./setup-before-after-all');

beforeEach(() => {
  mockInfo.mockClear();
  spyGlob.mockClear();
  spyPathExistsSync.mockClear();

  spyCopySync.mockClear();
  spyStatSync.mockClear();
  spyReaddirSync.mockClear();
  spyReadFileSync.mockClear();
  spyWriteFileSync.mockClear();

  mockNext.mockClear();
});

// params for SmashCopy
const ctx = {};
const filesGlob = [
  // dirs glob
  './src/filesGlo* -----> /dist/',
  // files glob
  '/src/filesGlob/*.js -> /dist/filesGlobJavascript',
];

describe('with glob files', () => {
  it('should copy well', (done) => {
    SmashCopy(ctx, { files: filesGlob }, mockNext);

    expect(spyPathExistsSync).not.toBeCalled();

    expect(spyGlob).toBeCalled();
    expect(spyGlob.mock.calls.length).toBe(2);
    expect(spyGlob.mock.calls[0][0]).tbEqual('./src/filesGlo*');
    expect(spyGlob.mock.calls[1][0]).tbEqual('./src/filesGlob/*.js');

    expect(spyCopySync).toBeCalled();

    expect(spyStatSync).not.toBeCalled();

    expect(mockNext).toBeCalled();
    done();
  });
});

describe('with glob files and tplData', () => {
  it('should copy well', (done) => {
    SmashCopy(ctx, { files: filesGlob, tplData: { name: 'erye' } }, mockNext);

    expect(spyPathExistsSync).not.toBeCalled();

    expect(spyGlob).toBeCalled();
    expect(spyGlob.mock.calls.length).toBe(2);
    expect(spyGlob.mock.calls[0][0]).tbEqual('./src/filesGlo*');
    expect(spyGlob.mock.calls[1][0]).tbEqual('./src/filesGlob/*.js');

    expect(spyStatSync).toBeCalled();
    expect(spyReaddirSync).toBeCalled();
    expect(spyReadFileSync).toBeCalled();
    expect(spyWriteFileSync).toBeCalled();

    expect(mockNext).toBeCalled();
    done();
  });
});
