/**
 * 注册命令，绑定任务
 */

const Config = require('../config');
const program = require('commander');

class CommandRegister {
    static registerVersion() {
        program
            .version(Config.PackageVersion);
    }

    static registerInit() {
        program
            .command('init <template.yml-url>')
            // .alias('init')
            .description('读取 <template.yml-url> 配置，然后通过问询的方式初始化项目')
            .action(function (templateName, options) {
                // 问询方式，拿远程的列表展示安装列表
                // 
            });
    }

    static registerInstall() {
        program
            .command('install <template-name>')
            .alias('i')
            .description('安装 <template-name> 模板项目')
            .action(function (templateName, options) {
                if (templateName) {
                    console.log(templateName);
                    // 检测是否有这个包，
                    // 有，下载
                    // 没有，提示错误
                } else {
                    // 提示：需要输入模板名称
                }
            });
    }

    static registerRun(doTask = () => { }) {
        program
            .command('run <task-name>')
            .alias('r')
            .description('执行 <task-name> 任务')
            .action(function (taskName, options) {
                doTask(taskName, options);
            });
    }

    static finish() {
        program.parse(process.argv);

        if (program.all) {
            process.exit(-1);
        }
    }
}

module.exports = CommandRegister;
