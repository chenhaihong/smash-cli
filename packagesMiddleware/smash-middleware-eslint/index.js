/**
 * An eslint middleware for smash-cli.
 */

const fse = require('fs-extra');
const path = require('path');
const execSh = require('exec-sh');
const spawn = require('cross-spawn');
const yaml = require('yaml');

module.exports = function middleware(ctx, config, next) {
  let { option = '', options = '' } = config;

  // （1）获取options参数，如果是数组，转为字符串
  // 这个参数的规范与ESLint的规范一致
  if (option && !options) options = option;
  Array.isArray(options) && (options = options.join(' '));

  console.log('[smash-middleware-eslint] ESLint...');

  // （2）如果不是初始化操作，安装缺失的插件
  // 这个操作需要有网络环境
  if (options.indexOf('--init') === -1) {
    installModules();
  }

  // （3）获取ESLint的脚本路径
  let shellPath = path.resolve(__dirname, './node_modules/.bin/eslint');
  if (process.platform == 'win32') {
    shellPath += '.cmd';
  }
  // （4）执行esliint
  execSh([`${shellPath} ${options}`], (err) => {
    if (err) {
      console.log('');
      console.log(`[smash-middleware-eslint] End with exit code ${err.code}.`);
      return;
    }

    if (next) {
      console.log('');
      next();
    }
  });
};

function installModules() {
  let url = '';
  let subs = ['.eslintrc.js', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json', '.eslintrc', 'package.json'];
  for (const sub of subs) {
    url = path.resolve(process.cwd(), `./${sub}`);
    if (fse.pathExistsSync(url)) {
      break;
    } else {
      url = '';
    }
  }

  if (!url) {
    console.error('[smash-middleware-eslint] Configuration file not found.');
    process.exit();
  }

  // 获取配置
  const config = (() => {
    if (path.extname(url) === '.yaml' || path.extname(url) === '.yml') {
      return yaml.parse(url);
    } else {
      return require(url);
    }
  })();

  // 获取需要安装的plugins
  const modules = getModulesList(config);
  modules.length && installSyncSaveDev(modules);
}

function getModulesList(config) {
  const modules = {};

  // （1）将plugins字段上的插件添加到modules上
  if (config.plugins) {
    for (const plugin of config.plugins) {
      modules[`eslint-plugin-${plugin}`] = 'latest';
    }
  }

  // （2）将extends字段上的配置关联到的插件添加到modules上
  let exts = config.extends;
  if (exts && typeof exts === 'string') {
    exts = [exts];
  }
  exts.forEach((ext) => {
    if (ext.indexOf('eslint:') === -1 && ext.indexOf('plugin:') === -1) {
      const moduleName = `eslint-config-${ext}`;

      modules[moduleName] = 'latest';
      Object.assign(modules, getPeerDependencies(`${moduleName}@latest`));
    }
  });

  // （3）如果已经安装过，从modules移除掉它，不需要再次安装
  delete modules.eslint;
  const pkg = require(path.resolve(__dirname, './package.json'));
  Object.keys(modules).forEach((name) => {
    if ((pkg.dependencies && pkg.dependencies[name]) || (pkg.devDependencies && pkg.devDependencies[name])) {
      delete modules[name];
    }
  });

  // （4）返回未安装插件列表
  return Object.keys(modules).map((name) => `${name}@${modules[name]}`);
}

function getPeerDependencies(moduleName) {
  let result = getPeerDependencies.cache.get(moduleName);

  if (!result) {
    // console.info(`Checking peerDependencies of ${moduleName}`);
    result = fetchPeerDependencies(moduleName);
    getPeerDependencies.cache.set(moduleName, result);
  }

  return result;
}
getPeerDependencies.cache = new Map();

function fetchPeerDependencies(packageName) {
  const npmProcess = spawn.sync('npm', ['show', '--json', packageName, 'peerDependencies'], { encoding: 'utf8' });

  const error = npmProcess.error;

  if (error && error.code === 'ENOENT') {
    return null;
  }
  const fetchedText = npmProcess.stdout.trim();

  return JSON.parse(fetchedText || '{}');
}

function installSyncSaveDev(packages) {
  const packageList = Array.isArray(packages) ? packages : [packages];
  const npmProcess = spawn.sync('npm', ['i', '--save-dev'].concat(packageList), { stdio: 'inherit', cwd: __dirname });
  const error = npmProcess.error;

  if (error && error.code === 'ENOENT') {
    const pluralS = packageList.length > 1 ? 's' : '';

    log.error(
      `Could not execute npm. Please install the following package${pluralS} with a package manager of your choice: ${packageList.join(
        ', '
      )}`
    );
  }
}
