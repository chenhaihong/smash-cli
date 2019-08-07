const { resolve } = require('path');
const execShPromise = require('exec-sh').promise;
const fse = require('fs-extra');

const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');
const smashBin = resolve(ROOT, 'lib/bin');
const bin = (cwd) => (command) => execShPromise(`node ${smashBin} ${command}`, { cwd, stdio: null });

jest.setTimeout(100e3);

beforeAll(() => {
  fse.emptyDirSync(TEMP);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  fse.emptyDirSync(TEMP);
  fse.removeSync(TEMP);
});

describe('cli', () => {
  describe('should print help info', () => {
    it('without any option or command', async () => {
      const { stdout, stderr } = await bin(null)('');
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash install smash-template-react/);
      expect(stdout).toMatch(/smash run helloworld/);
    });

    it('with "--help" option', async () => {
      const { stdout, stderr } = await bin(null)('--help');
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash install smash-template-react/);
      expect(stdout).toMatch(/smash run helloworld/);
    });

    it('with "-h" option', async () => {
      const { stdout, stderr } = await bin(null)('-h');
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash install smash-template-react/);
      expect(stdout).toMatch(/smash run helloworld/);
    });
  });

  it('shold run smash-init with "init" command', async () => {
    const cwd = resolve(TEMP, 'dir_for_init');
    fse.ensureDirSync(cwd);
    const { stdout, stderr } = await bin(cwd)('init');
    expect(stdout).toMatch(/initialized successfully\./);
  });

  describe('install|i <template>', () => {
    it('shold run smash-install with "install" command', async () => {
      const cwd = resolve(TEMP, 'dir_for_install');
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('install smash-template-react');
      expect(stdout).toMatch(/successfully installed\./);
    });

    it('shold run smash-install with "i" command', async () => {
      const cwd = resolve(TEMP, 'dir_for_i');
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('i smash-template-react');
      expect(stdout).toMatch(/successfully installed\./);
    });
  });

  describe('run|r <task>', () => {
    const cwd = resolve(ROOT, '__fixtures__/smash-project');
    it('shold run smash-run with "run" command', async () => {
      const { stdout, stderr } = await bin(cwd)('run helloworld');
      expect(stdout).toMatch(/Hello world/);
    });

    it('shold run smash-run with "r" command', async () => {
      const { stdout, stderr } = await bin(cwd)('r helloworld');
      expect(stdout).toMatch(/Hello world/);
    });
  });
});
