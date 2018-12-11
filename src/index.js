// 执行 `smash init` 时，需要用到的包
const TaskConfigCreator = require('smash-task-configure-creator');

const Config = require('./config');
const CommandRegister = require('./core/CommandRegister');

// 执行 `smash run <task>` 时，需要用到的3个类
const TaskFinder = require('./core/TaskFinder')(Config.CustomedTasksYmlUrl);
const PackageLoader = require('./core/PackageLoader');
const QueueRunner = require('./core/QueueRunner');

CommandRegister.registerVersion();
CommandRegister.registerInit(() => {
    // （1）还没在工作目录下创建过配置文件
    if (!TaskConfigCreator.hasCreated()) {
        // （2）在工作目录下创建配置文件
        TaskConfigCreator.create();
    }
});
CommandRegister.registerInstall((templateName, options) => {
    // TODO 安装模板
});
CommandRegister.registerRun((taskName, options) => {
    // （1）获取当前任务对应的中间件队列配置。
    // 通过用户执行的`smash run taskName`命令，拿到当前执行任务里面包含的中间件队列配置。
    const middlewareConfigQueue = TaskFinder.getMiddlewareQueue(taskName);
    // （2.1）如果用户定义了这个任务
    if (middlewareConfigQueue) {
        // （3）过滤拿到未下载的中间件。
        const uninstalledMiddlewarenames = PackageLoader.getUninstalledPackageNames(middlewareConfigQueue);
        // （4）同步下载中间件。
        uninstalledMiddlewarenames.forEach(name => PackageLoader.localInstall(name));
        // （5）执行中间件队列。
        QueueRunner.dequeue(middlewareConfigQueue);
    }
    // （2.2）如果用户未定义这个任务，提示没有定义该任务
    else {
        console.warn(`提示：您未定义 ${taskName} 任务！`);
        process.exit();
    }
});
CommandRegister.finish();