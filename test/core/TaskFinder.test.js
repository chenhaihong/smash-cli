#!/usr/bin/env node

const assert = require('assert');
const path = require('path');
const CustomedTasksYmlUrl = path.normalize(path.resolve(__dirname, '../.smash/task.yml'));
const TaskFinder = require('../../src/core/TaskFinder')(CustomedTasksYmlUrl);

const taskName = [
    'build',
    'test',
    'dev',
];
const actuals = [
    TaskFinder.getMiddlewareQueue(taskName[0]),
    TaskFinder.getMiddlewareQueue(taskName[1]),
    TaskFinder.getMiddlewareQueue(taskName[2]),
];
expecteds = [
    [
        { name: 'smash-middleware-build' },
    ],
    [
        { name: 'smash-middleware-test' },
    ],
    [
        { name: 'smash-middleware-clean' },
        { name: 'smash-middleware-copy' },
        { name: 'smash-middleware-mock' },
        { name: 'smash-middleware-webpack' },
        { name: 'smash-middleware-server' },
    ],
];
actuals.forEach((item, index) => {
    assert.deepEqual(actuals[index], expecteds[index]);
});

console.log(`Testing finished.`);