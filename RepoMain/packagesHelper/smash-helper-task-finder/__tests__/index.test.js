'use strict';
const { resolve } = require('path');
const TaskFinder = require('../lib');

const lastCwd = process.cwd();
const DIR_FIXTURE = resolve(__dirname, '../__fixtures__/smash-project');

beforeAll(() => {
  process.chdir(DIR_FIXTURE); // 将工作空间临时迁到这个目录
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.chdir(lastCwd); // 重置工作空间
});

describe('smash-helper-task-finder', () => {
  it('should get two tasks well', () => {
    expect.assertions(2);
    const tasks = TaskFinder.getTasks();
    expect(tasks).toHaveProperty('helloworld');
    expect(tasks).toHaveProperty('task-with-unknown-middleware');
  });

  it('should get middlewareQueue by task name well', () => {
    expect.assertions(3);
    const middlewareQueue = TaskFinder.getMiddlewareQueue('helloworld');
    expect(middlewareQueue[0]).toHaveProperty('name');
    expect(middlewareQueue[0]).toHaveProperty('paramA');
    expect(middlewareQueue[0]).toHaveProperty('paramB');
  });
});
