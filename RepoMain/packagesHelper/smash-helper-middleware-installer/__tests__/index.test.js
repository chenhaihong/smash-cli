'use strict';
const cp = require('child_process');
const os = require('os');
const { normalize, resolve } = require('path');
const fse = require('fs-extra');
const pacote = require('pacote');
const HMI = require('../lib');

// spy on child_process
const spyExecSync = jest.spyOn(cp, 'execSync');
// spy on pacote
const spyExtract = jest.spyOn(pacote, 'extract');
// spy on fs-extra
const spyEnsureFileSync = jest.spyOn(fse, 'ensureFileSync');
const spyReadJsonSync = jest.spyOn(fse, 'readJsonSync');
const spyWriteJsonSync = jest.spyOn(fse, 'writeJsonSync');

const lastCwd = process.cwd();
const REPO_MIDDLEWARE = resolve(os.homedir(), '.smash-cli', 'middleware');

jest.setTimeout(100e3);
beforeAll(() => {
  fse.emptyDirSync(REPO_MIDDLEWARE);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
});

describe('smash-helper-middleware-installer', () => {
  it('should getUnrepeatedMiddlewareSpecifiers well', () => {
    const tasks = {
      helloworld: [
        { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' },
        { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' },
        { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' },
      ],
    };
    const specs = ['smash-middleware-helloworld'];
    const result = HMI.getUnrepeatedMiddlewareSpecifiers(tasks);
    expect(result).toEqual(specs);
  });

  it('should resolveInstallationPath well', () => {
    const name = 'smash-middleware-helloworld';
    const version = '0.0.22';
    const expected = normalize(resolve(REPO_MIDDLEWARE, name, version));
    const received = HMI.resolveInstallationPath(name, version);
    expect(received).toEqual(expected);
  });

  describe('manifest', () => {
    it('should fetch manifest well', async (done) => {
      const specifier = 'smash-middleware-helloworld@0.0.22';
      const received = await HMI.manifest(specifier);
      expect(received).toHaveProperty('name', 'smash-middleware-helloworld');
      expect(received).toHaveProperty('version', '0.0.22');

      done();
    });
    it('should not fetch manifest well', async (done) => {
      const specifier = '@tii/smash-middleware-unknown-helloworld@0.0.22';

      // Testing Asynchronous Code
      // https://jestjs.io/docs/en/asynchronous

      // 断言异步函数抛出了错误
      // How to assert an async method throwing Error using toThrow with Jest
      // Type 1
      const spy = jest.fn();
      await HMI.manifest(specifier).catch(spy);
      expect(spy).toHaveBeenCalled(); // SUCCESS

      // Type 2, jest 22.0.0 +
      // await expect(HMI.manifest(specifier)).rejects.toThrow(); // SUCCESS

      done();
    });
  });

  it('should check hasInstalled well', async (done) => {
    const name = 'smash-middleware-helloworld';
    const version = '0.0.22';
    {
      fse.emptyDirSync(REPO_MIDDLEWARE);
      // 未安装
      const received = HMI.hasInstalled(name, version);
      expect(received).toBeFalsy();
    }
    {
      await HMI.install(name, version);
      // 已经安装
      const received = HMI.hasInstalled(name, version);
      expect(received).toBeTruthy();
    }
    done();
  });

  it('should install well', async (done) => {
    const name = 'smash-middleware-helloworld';
    const version = '0.0.22';
    const specifier = `${name}@${version}`;
    const destination = HMI.resolveInstallationPath(name, version);
    await HMI.install(name, version);

    expect(spyExtract.mock.calls[0][0]).toBe(specifier);
    expect(spyExtract.mock.calls[0][1]).toBe(destination);

    expect(spyExecSync.mock.calls[0][0]).toBe('npm i');
    expect(spyExecSync.mock.calls[0][1]).toEqual({ cwd: destination });

    expect(spyReadJsonSync.mock.calls.length).toBe(2);
    expect(spyWriteJsonSync.mock.calls.length).toBe(2);

    done();
  });

  describe('writeInstalledPath/readInstalledPath', () => {
    const name = 'smash-middleware-helloworld';
    const version = '0.0.22';
    const specifier = `${name}@${version}`;
    const destination = HMI.resolveInstallationPath(name, version);

    it('should writeInstalledPath well', () => {
      HMI.writeInstalledPath(specifier, destination);
      expect(spyEnsureFileSync.mock.calls.length).toBe(1);
      expect(spyReadJsonSync.mock.calls.length).toBe(1);
      expect(spyWriteJsonSync.mock.calls.length).toBe(1);
    });
    it('should readInstalledPath well', () => {
      HMI.writeInstalledPath(specifier, destination);
      jest.clearAllMocks();

      const received = HMI.readInstalledPath(specifier);
      expect(received).toBe(destination);

      expect(spyEnsureFileSync.mock.calls.length).toBe(1);
      expect(spyReadJsonSync.mock.calls.length).toBe(1);
    });
    it('should readInstalledPath well without FILE_MIDDLEWARE_PATHINFO', () => {
      fse.emptyDirSync(REPO_MIDDLEWARE);
      const received = HMI.readInstalledPath(specifier);
      expect(received).toBeUndefined();
    });
  });
});
