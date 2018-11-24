/**
 * 默认配置
 */

const path = require('path');
const pkg = require('../../package.json');
const cwd = process.cwd();

const Config = {
    CustomedTasksYmlUrl: path.normalize(`${cwd}/.smash/task.yml`),                 // 用户配置地址
    PackageJsonUrl: path.normalize(path.resolve(__dirname, '../../package.json')), // smash-cli package.json 路径

    PackageDirectory: path.normalize(path.resolve(__dirname, '../../')),           // smash-cli 包的目录
    PackageVersion: pkg.version,
};

module.exports = Config;