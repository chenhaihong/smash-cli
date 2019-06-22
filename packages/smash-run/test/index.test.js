#!/usr/bin/env node

const path = require('path');
const run = require('..');

{
    // 修改工作目录到./test目录
    const wd = path.resolve(__dirname);
    process.chdir(wd);
}

try {
    (async () => {
        const timeName = `Test function nun`;
        console.time(timeName);
        await run('helloworld');
        console.timeEnd(timeName);
    })();
} catch (error) {
    console.log(error);
}