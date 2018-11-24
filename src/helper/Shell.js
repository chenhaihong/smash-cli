/**
 * 执行命令
 * 
 * child_process.execSync(command[, options])
 * http://nodejs.cn/api/child_process.html#child_process_child_process_execsync_command_options
 * 
 * Node.js调用cmd输出中文乱码
 * https://blog.csdn.net/liuyaqi1993/article/details/78723797
 * 
 * 一次永久解决cmd窗口汉字显示乱码
 * https://blog.csdn.net/quzhongxin/article/details/45336333
 * 
 * node.js调用系统命令，输出结果中文会乱码
 * https://ask.csdn.net/questions/167560
 */

const process = require('child_process');

class Shell {
    /**
     * 执行命令
     * @param {String} command 
     * @param {Object} options 
     * @param {Object} callback 
     */
    static exec(command, options = {}) {
        console.log('--------------------------------------');
        console.count('Count');
        console.log(`Shell.exec: ${command}`);
        console.log('--------------------------------------');

        options = {
            ...options,
            encoding: 'utf8',
            windowsHide: false,
        };

        try {
            const result = process.execSync(command, options);
            console.log(result);
            return result;
        } catch (err) {
            console.log(err.stack || err.message);
            return err;
        } finally {
            console.log('--------------------------------------');
        }
    }
}

module.exports = Shell;