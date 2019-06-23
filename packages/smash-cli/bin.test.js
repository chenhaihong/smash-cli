#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fse = require('fs-extra');

const binFilePath = path.resolve(__dirname, './bin.js');

// 测试初初始化命令
{
    const timeName = `Test smash init`;
    console.time(timeName);
    {
        const cwd = path.resolve(__dirname, './temp/smash-init');
        fse.ensureDirSync(cwd);
        const r = execSync(`node ${binFilePath} init`, { cwd, encoding: 'utf8' });
        console.log(r);
    }
    console.timeEnd(timeName);
}

// 测试安装模板命令
{
    const timeName = `Test smash install`;
    console.time(timeName);
    {
        const cwd = path.resolve(__dirname, './temp/smash-install');
        fse.ensureDirSync(cwd);
        const r = execSync(`node ${binFilePath} install smash-middleware-helloworld`, { cwd, encoding: 'utf8' });
        console.log(r);
    }
    console.timeEnd(timeName);
}

// 测试运行任务命令
{
    const timeName = `Test smash run`;
    console.time(timeName);
    {
        const cwd = path.resolve(__dirname, './temp/smash-run');
        fse.ensureDirSync(cwd);
        const r1 = execSync(`node ${binFilePath} init`, { cwd, encoding: 'utf8' });
        console.log(r1);
        const r2 = execSync(`node ${binFilePath} run helloworld`, { cwd, encoding: 'utf8' });
        console.log(r2);
    }
    console.timeEnd(timeName);
}