/**
 * 拷贝辅助方法
 */

const fs = require('fs');
const path = require('path');
const stat = fs.stat;

class Copier {
    /**
     * 这里只处理2种情况：
     * （1）src=文件，dst=文件：将文件写入到目标文件；
     * （2）src=目录，dst=目录：将目录内的文件拷贝到目标目录。
     * @param {String} src 源目录|文件
     * @param {String} dst 目标目录|文件path
     */
    static copy(src, dst) {
        // （1）判断源是否存在
        const stats = fs.statSync(src); // 如果目录|文件不存在，这里会抛出错误
        // （2.1）源是文件
        if (stats.isFile()) {
            // （3）创建父级目录：必须父级目录才能拷贝文件。
            this.mkDir(path.dirname(dst));
            // （4）拷贝文件到目标文件
            this.copyFile(src, dst);
        }
        // （2.2）源是文件夹
        else if (stats.isDirectory()) {
            // （3）拷贝目录内的文件到目标目录。
            this.copyDir(src, dst);
        }
    }

    /**
     * 递归创建目录
     * @param {String} dir 目录
     */
    static mkDir(dir) {
        try {
            fs.statSync(dir); // 如果目录不存在，这里会抛出错误
            return true;
        } catch (error) {
            if (this.mkDir(path.dirname(dir))) {
                fs.mkdirSync(dir);
                return true;
            }
        }

        // node v10.12.0
        // The second argument can now be an options object with recursive and mode properties.
        // try {
        //     fs.statSync(dir);
        // } catch (error) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }
    }

    /**
     * 将文件写入到目标文件
     * @param {String} src 源文件
     * @param {String} dst 目标文件
     */
    static copyFile(src, dst) {
        // 写入文件
        const reader = fs.createReadStream(src); // 创建读取流
        const writer = fs.createWriteStream(dst); // 创建写入流
        reader.pipe(writer); // 通过管道来传输流
    }

    /**
     * 将目录内的文件拷贝到目标目录
     * @param {String} src 源目录
     * @param {String} dst 目标目录
     */
    static copyDir(src, dst) {
        // （1）读取源目录
        fs.readdir(src, (err, paths) => {
            // （2.1）读取失败，抛出错误
            if (err) {
                throw err;
            }
            // （2.2）读取成功
            else {
                // （3）创建目标目录
                try {
                    fs.statSync(dst); // 如果目录不存在，这里会抛出错误
                } catch (error) {
                    fs.mkdirSync(dst); // 必须有目标目录，才能往里面写文件
                }
                // （4）遍历paths
                paths.forEach((path) => {
                    const _src = `${src}/${path}`;
                    const _dst = `${dst}/${path}`;
                    const stats = fs.statSync(_src);
                    // （4.1）拷贝文件
                    if (stats.isFile()) {
                        this.copyFile(_src, _dst); // 写入文件
                    }
                    // （4.2）拷贝目录
                    else if (stats.isDirectory()) {
                        this.copyDir(_src, _dst); // 递归拷贝目录内的文件
                    }
                });
            }
        });
    }
}

module.exports = Copier;