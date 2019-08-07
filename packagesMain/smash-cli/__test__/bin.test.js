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
const TEMP_CWD = resolve(ROOT, '__temp__');
const smashBin = resolve(ROOT, 'lib/bin.js');
const bin = (cwd) => (command) => execShPromise(`node ${smashBin} ${command}`, { cwd, stdio: null });

beforeAll(() => {
  fse.emptyDirSync(TEMP_CWD);
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  fse.removeSync(TEMP_CWD);
});

describe('cli', () => {
  test('should print help info without any option or command', async () => {
    const { stdout, stderr } = await bin(null)('');
    expect.assertions(5);
    expect(spyProgramHelp).toBeCalled();
    expect(stdout).toMatch(/Examples\:/);
    expect(stdout).toMatch(/smash init/);
    expect(stdout).toMatch(/smash install smash-template-react/);
    expect(stdout).toMatch(/smash run helloworld/);
  });

  test('should print help info with "-h|--help" option', async () => {
    const { stdout, stderr } = await bin(null)('--help');
    expect.assertions(5);
    expect(spyProgramHelp).toBeCalled();
    expect(stdout).toMatch(/Examples\:/);
    expect(stdout).toMatch(/smash init/);
    expect(stdout).toMatch(/smash install smash-template-react/);
    expect(stdout).toMatch(/smash run helloworld/);
  });

  test('shold run smash-init with "init" command', async () => {
    const { stdout, stderr } = await bin('init');

    expect(spySmashInit).toBeCalled();
  });

  test('shold run smash-install with "install|i" command', async () => {
    const { stdout, stderr } = await bin('install smash-template-react');

    expect(spySmashInstall).toBeCalled();
  });

  test('shold run smash-run with "run|r" command', async () => {
    const { stdout, stderr } = await bin('run helloworld');

    expect(spySmashRun).toBeCalled();
  });
});
