#!/usr/bin/env node

const path = require('path');
const Shell = require('../../src/helper/Shell');

const command = 'ls -l';
const cwd = path.normalize(path.resolve(__dirname, '../../')); // smash-cli包目录
const options = {
    cwd,
};

const result = Shell.exec(command, options);
console.log(result);
