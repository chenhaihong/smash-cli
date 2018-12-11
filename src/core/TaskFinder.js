/**
 * 任务查找器
 */

const ParseYaml = require('../helper/ParseYaml');

class TaskFinder {
    /**
     * 构造器
     * @param {String} customedTasksYmlUrl 
     */
    constructor(customedTasksYmlUrl) {
        this.customedTasksYmlUrl = customedTasksYmlUrl;
    }

    getCustomedTasks() {
        const tasks = ParseYaml(this.customedTasksYmlUrl);
        return tasks;
    }

    getMiddlewareQueue(taskName) {
        const tasks = this.getCustomedTasks(this.customedTasksYmlUrl);
        const task = tasks[taskName];

        return task; // 每个任务都是一个中间件队列
    }
}

/**
 * 构造器
 * @param {String} customedTasksYmlUrl 
 */
module.exports = (customedTasksYmlUrl) => {
    return new TaskFinder(customedTasksYmlUrl);
}; 