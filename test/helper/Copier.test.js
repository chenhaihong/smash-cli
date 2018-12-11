#!/usr/bin/env node

const path = require('path');
const Copier = require('../../src/helper/Copier');
const cwd = process.cwd();

const src = path.resolve(`${cwd}`, './test'); 
const dst = path.resolve(`${cwd}`, './test.copy'); 

Copier.copy(src, dst);

// src=文件，dst=目录
// src=文件，dst=文件

// src=目录，dst=目录
// src=目录，dst=文件