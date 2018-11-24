#!/usr/bin/env node

const assert = require('assert');
const PackageLoader = require('../../src/core/PackageLoader');
const QueueRunner = require('../../src/core/QueueRunner');

const middlewareConfigQueue = [
    { name: 'smash-middleware-helloworld', port: 8000 },
    { name: 'smash-middleware-helloworld', port: 8000 },
    { name: 'smash-middleware-helloworld', port: 8000 },
];

middlewareConfigQueue.forEach(middlewareConfig => {
    const { name: packageName } = middlewareConfig;
    if (!PackageLoader.hasLocalPackage(packageName)) {
        PackageLoader.localInstall(packageName); // 同步下载包
    }
});

QueueRunner.dequeue(middlewareConfigQueue);