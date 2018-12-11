/**
 * 默认配置
 */

const os = require('os');
const path = require('path');
const pkg = require('../../package.json');
const cwd = process.cwd();

const Config = {
    HomeDir: os.homedir(),                                                         // home目录
    SmashRepository: path.normalize(`${os.homedir()}/.smash/`),                    // smash仓库：存放中间件、模板
    CustomedTasksYmlUrl: path.normalize(`${cwd}/.smash/task.yml`),                 // 用户配置地址
    TemplatesYmlUrl: path.normalize(path.resolve(__dirname, './templates.yml')),   // 模板配置地址

    PackageJsonUrl: path.normalize(path.resolve(__dirname, '../../package.json')), // smash-cli package.json 路径

    PackageDirectory: path.normalize(path.resolve(__dirname, '../../')),           // smash-cli 包的目录
    PackageVersion: pkg.version,
};

module.exports = Config;