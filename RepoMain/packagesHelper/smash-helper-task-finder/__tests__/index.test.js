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
    expect.assertions(2);
    const middlewareQueue = TaskFinder.getMiddlewareQueue('helloworld');
    expect(middlewareQueue[0]).toEqual({
      name: 'smash-middleware-helloworld',
      paramA: 'param a',
      paramB: 'param b',
    });
    expect(middlewareQueue[1]).toEqual({
      name: 'smash-middleware-helloworld',
      paramA: 'param a',
      paramB: 'param b',
    });
  });

  it('should get all un-repeated middleware-names well', () => {
    expect.assertions(1);
    const middlewares = TaskFinder.getMiddlewareNames();
    const expected = ['smash-middleware-helloworld', 'smash-middleware-dlrowolleh'];
    expect(middlewares).toEqual(expected);
  });
});
