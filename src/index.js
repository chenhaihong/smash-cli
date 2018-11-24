const Config = require('./config');
const CommandRegister = require('./core/CommandRegister');
const TaskFinder = require('./core/TaskFinder')(Config.CustomedTasksYmlUrl);
const PackageLoader = require('./core/PackageLoader');
const QueueRunner = require('./core/QueueRunner');

CommandRegister.registerVersion();
CommandRegister.registerInit();
CommandRegister.registerInstall();
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