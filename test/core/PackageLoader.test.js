#!/usr/bin/env node

const assert = require('assert');
const PackageLoader = require('../../src/core/PackageLoader');
const Shell = require('../../src/helper/Shell');

let actual, expected, pkgs, actuals, expecteds, middlewareConfigQueue;

//========================================================
// PackageLoader.splitPackageName
// 拆分名称与版本的方法
//========================================================
// 总共测试了4种类型包格式
pkgs = [
    'smash-cli',
    'smash-cli@1.0.0',
    'smash-cli@*',
    '@erye/smash-cli',
    '@erye/smash-cli@1.0.0',
];
actuals = [
    PackageLoader.splitPackageName(pkgs[0]),
    PackageLoader.splitPackageName(pkgs[1]),
    PackageLoader.splitPackageName(pkgs[2]),
    PackageLoader.splitPackageName(pkgs[3]),
    PackageLoader.splitPackageName(pkgs[4]),
];
expecteds = [
    { name: 'smash-cli', version: '' },
    { name: 'smash-cli', version: '1.0.0' },
    { name: 'smash-cli', version: '*' },
    { name: '@erye/smash-cli', version: '' },
    { name: '@erye/smash-cli', version: '1.0.0' },
];
actuals.forEach((item, index) => {
    assert.deepEqual(actuals[index], expecteds[index]);
});

//========================================================
// PackageLoader.isSameVersion
// 匹配版本号
//========================================================
actuals = [
    PackageLoader.isSameVersion('1.0.0', '1.0.0'),
    PackageLoader.isSameVersion('', '1.0.0'),
    PackageLoader.isSameVersion('*', '1.0.0'),
    PackageLoader.isSameVersion('~1.1.1', '1.0.0'),
    PackageLoader.isSameVersion('^1.1.1', '1.0.0'),
];
expecteds = [
    true,
    true,
    false,
    false,
    true,
];
actuals.forEach((item, index) => {
    assert.equal(actuals[index], expecteds[index]);
});

//========================================================
// PackageLoader.hasGlobalPackage
// 是否已经下载全局包
//========================================================
pkgs = [
    'smash-cli@^4.0.0',
    'smash-cli@^0.0.1',
    'smash-cli',
    'nrm',
];
actuals = [
    PackageLoader.hasGlobalPackage(pkgs[0]),
    PackageLoader.hasGlobalPackage(pkgs[1]),
    PackageLoader.hasGlobalPackage(pkgs[2]),
    PackageLoader.hasGlobalPackage(pkgs[3]),
];
expecteds = [
    false,
    true,
    true,
    true,
];
actuals.forEach((item, index) => {
    assert.equal(actuals[index], expecteds[index]);
});

//========================================================
// PackageLoader.hasLocalPackage
// 是否已经下载包
//========================================================
pkgs = [
    'commander@^2.19.10',
    'commander@2.22.10',
    'yaml',
];
actuals = [
    PackageLoader.hasLocalPackage(pkgs[0]),
    PackageLoader.hasLocalPackage(pkgs[1]),
    PackageLoader.hasLocalPackage(pkgs[2]),
];
expecteds = [
    false,
    false,
    false,
];
actuals.forEach((item, index) => {
    assert.equal(actuals[index], expecteds[index]);
});

//========================================================
// PackageLoader.getUninstalledPackageNames
// 拿到未下载的包名。
//========================================================
middlewareConfigQueue = [
    { name: 'smash-middleware-helloworld@0.0.1' },
    { name: 'smash-middleware-echo' },
    { name: 'smash-middleware-shell' },
    { name: 'smash-middleware-shell' },
    { name: 'smash-middleware-shell@*' },
    { name: 'smash-middleware-shell' },
    { name: 'smash-middleware-helloworld@*' },
    { name: 'smash-middleware-helloworld' },
];
actual = PackageLoader.getUninstalledPackageNames(middlewareConfigQueue);
expected = [
    'smash-middleware-helloworld@0.0.1',
    'smash-middleware-echo',
    'smash-middleware-shell',
];
assert.deepEqual(actual, expected);

//========================================================
// PackageLoader.load
// 下载包方法
//========================================================
PackageLoader.localInstall('store5@*');
Shell.exec('npm uninstall --save-dev store5');

console.log(`Testing finished.`);