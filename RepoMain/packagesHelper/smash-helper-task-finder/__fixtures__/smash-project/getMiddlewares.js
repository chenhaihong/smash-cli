const tasks = {
  'task-a': [
    { name: 'smash-middleware-helloworld', param: '123' },
    { name: 'smash-middleware-helloworld', param: '123' },
  ],
  'task-b': [
    { name: 'smash-middleware-shell' },
    { name: 'smash-middleware-helloworld', param: '123' },
    { name: 'smash-middleware-helloworld', param: '123' },
  ],
  'task-c': [
    { name: 'smash-middleware-webpack-v4' },
    { name: 'smash-middleware-shell' },
    { name: 'smash-middleware-helloworld', param: '123' },
    { name: 'smash-middleware-helloworld', param: '123' },
  ],
};

// 取出任务
const arr = Object.values(tasks);
// console.log(arr);

const middlewares = [];
arr.forEach((currentTask) => {
  currentTask.forEach((config) => {
    const { name } = config;
    if (!middlewares.includes(name)) {
      middlewares.push(name);
    }
  });
});

console.log(middlewares);
