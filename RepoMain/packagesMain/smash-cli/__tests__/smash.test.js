const os = require('os');
const { resolve } = require('path');
const execShPromise = require('exec-sh').promise;
const fse = require('fs-extra');

const REPO_MIDDLEWARE = resolve(os.homedir(), '.smash-cli', 'middleware');
const ROOT = resolve(__dirname, '..'); // 该包的根目录
const TEMP = resolve(ROOT, '__temp__');
const smashBin = resolve(ROOT, 'lib/smash');
const bin = (cwd) => (command) => execShPromise(`node ${smashBin} ${command}`, { cwd, stdio: null });

jest.setTimeout(5000e3);

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

describe('smash', () => {
  // 测试帮助命令
  describe('should print help info', () => {
    it('without any option or command', async (done) => {
      const { stdout, stderr } = await bin(null)('');
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash download smash-template-react/);
      expect(stdout).toMatch(/smash install/);
      expect(stdout).toMatch(/smash run helloworld/);

      done();
    });

    it('with "--help" option', async (done) => {
      const { stdout, stderr } = await bin(null)('--help');
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash download smash-template-react/);
      expect(stdout).toMatch(/smash install/);
      expect(stdout).toMatch(/smash run helloworld/);

      done();
    });

    it('with "-h" option', async (done) => {
      const { stdout, stderr } = await bin(null)('-h');
      expect(stdout).toMatch(/Examples\:/);
      expect(stdout).toMatch(/smash init/);
      expect(stdout).toMatch(/smash download smash-template-react/);
      expect(stdout).toMatch(/smash install/);
      expect(stdout).toMatch(/smash run helloworld/);

      done();
    });
  });

  // 测试初始化命令
  describe('init', () => {
    const cwd = resolve(TEMP, 'dir_for_init');

    it('should initialize un-initialized directory well', async (done) => {
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('init');
      expect(stdout).toMatch(/Initialized successfully\./);

      done();
    });

    it('should not initialize task-file-existed directory successfully', async (done) => {
      const { stdout, stderr } = await bin(cwd)('init');
      expect(stdout).toMatch(/Task.yml existed\./);

      done();
    });
  });

  // 测试下载模板包命令
  describe('download', () => {
    it('should run smash-download with "download" command', async (done) => {
      const cwd = resolve(TEMP, 'dir_for_download');
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('download smash-template-react');
      expect(stdout).toMatch(/Successfully downloaded/);

      done();
    });

    it('should run smash-download with "d" command', async (done) => {
      const cwd = resolve(TEMP, 'dir_for_d');
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('d smash-template-react');
      expect(stdout).toMatch(/Successfully downloaded/);

      done();
    });
  });

  // 测试安装中间件命令
  describe('install', () => {
    // 清空中间件仓库
    fse.emptyDirSync(REPO_MIDDLEWARE);
    const cwd = resolve(ROOT, '__fixtures__/smash-project');

    // 首次安装
    it('should run smash-install with "install" command', async (done) => {
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('install');
      expect(stdout).toMatch(/Installing\.\.\./);
      expect(stdout).toMatch(/Successfully installed\./);

      done();
    });

    // 二次安装
    it('should run smash-install with "i" command', async (done) => {
      fse.ensureDirSync(cwd);
      const { stdout, stderr } = await bin(cwd)('i');
      expect(stdout).toMatch(/Already installed\./);

      done();
    });
  });

  // 测试运行任务命令
  describe('run', () => {
    const cwd = resolve(ROOT, '__fixtures__/smash-project');

    it('should run smash-run with "run" command', async (done) => {
      // 需要先安装好中间件包
      await bin(cwd)('install');

      const { stdout, stderr } = await bin(cwd)('run helloworld');
      expect(stdout).toMatch(/Hello world/);

      done();
    });

    it('should run smash-run with "r" command', async (done) => {
      // 需要先安装好中间件包
      await bin(cwd)('install');

      const { stdout, stderr } = await bin(cwd)('r helloworld');
      expect(stdout).toMatch(/Hello world/);

      done();
    });
  });
});
