const { resolve } = require('path');
const execShPromise = require('exec-sh').promise;
const fse = require('fs-extra');
const program = require('commander');
const programmaticSmash = require('../lib/index');

// spy on commander
const spyProgramHelp = jest.spyOn(program, 'help');
// spy on programmaticSmash
const spySmashInit = jest.spyOn(programmaticSmash, 'init');
const spySmashInstall = jest.spyOn(programmaticSmash, 'install');
const spySmashRun = jest.spyOn(programmaticSmash, 'run');

const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');
const smashBin = resolve(ROOT, 'lib/bin.js');
const bin = (cwd) => (command) => execShPromise(`node ${smashBin} ${command}`, { cwd, stdio: null });

beforeAll(() => {
  fse.emptyDirSync(TEMP);
});

afterEach(() => {
  fse.emptyDirSync(TEMP);
  jest.clearAllMocks();
});

afterAll(() => {
  fse.removeSync(TEMP);
});

describe('cli', () => {
  describe('print help info', () => {
    it('should print help info without any option or command', async () => {
      const { stdout, stderr } = await bin(null)('');
      expect.assertions(5);
      expect(spyProgramHelp).toBeCalled();
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash install smash-template-react/);
      expect(stdout).toMatch(/smash run helloworld/);
    });

    it('should print help info with "--help" option', async () => {
      const { stdout, stderr } = await bin(null)('--help');
      expect.assertions(5);
      expect(spyProgramHelp).toBeCalled();
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash install smash-template-react/);
      expect(stdout).toMatch(/smash run helloworld/);
    });

    it('should print help info with "-h" option', async () => {
      const { stdout, stderr } = await bin(null)('-h');
      expect.assertions(5);
      expect(spyProgramHelp).toBeCalled();
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash install smash-template-react/);
      expect(stdout).toMatch(/smash run helloworld/);
    });
  });

  it('shold run smash-init with "init" command', async () => {
    const { stdout, stderr } = await bin(TEMP)('init');

    expect(spySmashInit).toBeCalled();
  });

  describe('install|i', () => {
    it('shold run smash-install with "install" command', async () => {
      const { stdout, stderr } = await bin(TEMP)('install smash-template-react');
      expect(spySmashInstall).toBeCalled();
    });

    it('shold run smash-install with "i" command', async () => {
      const { stdout, stderr } = await bin(TEMP)('i smash-template-react');
      expect(spySmashInstall).toBeCalled();
    });
  });

  describe('run|r', () => {
    const cwd = resolve(ROOT, '__fixtures__/smash-project');
    it('shold run smash-run with "run" command', async () => {
      const { stdout, stderr } = await bin(cwd)('run helloworld');
      expect(spySmashRun).toBeCalled();
    });

    it('shold run smash-run with "r" command', async () => {
      const { stdout, stderr } = await bin(cwd)('r helloworld');
      expect(spySmashRun).toBeCalled();
    });
  });
});
