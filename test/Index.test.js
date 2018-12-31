#!/usr/bin/env node

const smash = require('..');
const path = require('path');
const fse = require('fs-extra');

// 测试初初始化方法
{
    const timeName = `Test functioon init`;
    console.time(timeName);
    {
        const cwd = path.resolve(__dirname, './temp/smash.init');
        fse.ensureDirSync(cwd);
        smash.init();
    }
    console.timeEnd(timeName);
}

// 测试安装模板方法
{
    const timeName = `Test functioon install`;
    console.time(timeName);
    {
        const cwd = path.resolve(__dirname, './temp/smash.install');
        fse.ensureDirSync(cwd);
        process.chdir(cwd);
        smash.install('smash-middleware-helloworld').then(() => {
            console.timeEnd(timeName);
        });
    }
}

// 测试运行任务方法
{
    const timeName = `Test functioon run`;
    console.time(timeName);
    {
        const cwd = path.resolve(__dirname, './temp/smash.run');
        fse.ensureDirSync(cwd);
        process.chdir(cwd);
        smash.init();
        smash.run('helloworld').then(() => {
            console.timeEnd(timeName);
        });
    }
}