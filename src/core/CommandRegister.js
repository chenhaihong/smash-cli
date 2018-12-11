/**
 * 注册命令，绑定任务
 */

const Config = require('../config');
const program = require('commander');

class CommandRegister {
    /**
     * 注册版本号。
     */
    static registerVersion() {
        program
            .version(Config.PackageVersion, '-v, --version');
    }

    /**
     * 注册初始化命令：该命令会在工作目录下生成.smash/task.yml文件
     * @param {Function} createTaskConfig 生成配置的函数
     */
    static registerInit(createTaskConfig = () => { }) {
        program
            .command('init')
            .description('生成smash任务配置文件')
            .action(function () {
                createTaskConfig();
            });
    }

    /**
     * 注册安装命令：该命令会在工作目录下安装模板项目
     */
    static registerInstall() {
        program
            .command('install <template>')
            .alias('i')
            .description('在当前工作目录安装 <template> 模板项目')
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

    /**
     * 注册run命令：该命令会执行注册任务里的中间件。
     * @param {Function} doTask 运行run|r命令时执行的函数
     */
    static registerRun(doTask = () => { }) {
        program
            .command('run <task>')
            .alias('r')
            .description('执行 <task> 任务')
            .action(function (taskName, options) {
                doTask(taskName, options);
            });
    }

    /**
     * 结束注册工作。
     */
    static finish() {
        program.on('--help', function () {
            console.log('');
            console.log('Examples:');
            console.log('  $ smash init');
            console.log('  $ smash install smash-template-react-v15');
            console.log('  $ smash run helloworld');
        });

        program.parse(process.argv);

        if (!process.argv.slice(2).length) {
            program.help();
        }

        if (program.all) {
            process.exit(-1);
        }
    }
}

module.exports = CommandRegister;
