/**
 * npm 包下载器
 * 
 * 变量命名提示：
 * （1）packageName：含有包名、版本号
 * （2）purePackageName：只含有包名
 */

const Shell = require('../helper/Shell');
const Config = require('../config');
const PackageInfo = require(Config.PackageJsonUrl);

class PackageLoader {
    /**
     * 拆分名称和版本号
     * @param {String} packageName 包名的类型总共有4种。
     */
    static splitPackageName(packageName) {
        // 包的类型总共有4种，
        // （1）'smash-cli'              => arr = [ 'smash-cli' ]
        // （2.1）'smash-cli@1.0.0'      => arr = [ 'smash-cli', '1.0.0' ]
        // （2.2）'smash-cli@*'          => arr = [ 'smash-cli', '*' ]
        // （3）'@erye/smash-cli'        => arr = [ '', 'erye/smash-cli' ]
        // （4）'@erye/smash-cli@1.0.0'  => arr = [ '', 'erye/smash-cli', '1.0.0' ]
        const arr = packageName.split('@');
        if (arr[0] == '') {        // 数组首位是空，符合类型 3、4
            arr[1] = `@${arr[1]}`; // 给第二位加上 @ 字符
            arr.shift();           // 移除首位
        }

        return { name: arr[0], version: arr[1] || '' };
    }

    /**
     * 匹配版本号，参数位置不能调换
     * @param {String} targetVersion 目标版本号
     * @param {String} currentVersion 当前版本号
     */
    static isSameVersion(targetVersion, currentVersion) {
        // npm包的规则比较复杂：
        // * 这意味着安装最新版本的依赖包
        // ~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
        // ^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
        let isSame = false;
        if (targetVersion == currentVersion) {
            isSame = true;
        }
        // targetVersion = ''
        if (targetVersion == '') {
            isSame = true;
        }
        // targetVersion = '*'
        else if (targetVersion == '*') { // 安装最新版本
            // 直接安装最新版本，不再做检查操作
            isSame = false;
        }
        // targetVersion = '~1.0.0'
        else if (targetVersion.indexOf('~') == 0) {                           // 会匹配最近的小版本依赖包
            let arr1 = targetVersion.replace(/[\~\^]/, '').split('.');        // => ['1', '2', 'x']
            let arr2 = currentVersion.replace(/[\~\^]/, '').split('.');       // => ['1', '2', 'x']
            isSame = arr1[0] == arr2[0] && arr1[1] == arr2[1];                // 1位、2位必须相等，3位人一直
        }
        // targetVersion = '^1.0.0'
        else if (targetVersion.indexOf('^') == 0) {                           // 会匹配最新的大版本依赖包
            let arr1 = targetVersion.replace(/[\~\^]/, '').split('.');        // => ['1', 'x', 'x']
            let arr2 = currentVersion.replace(/[\~\^]/, '').split('.');       // => ['1', 'x', 'x']
            isSame = arr1[0] == arr2[0];                                      // 1位必须相等，2位、3位任意值
        }
        // targetVersion = '1.0.0'
        else {
            isSame = targetVersion == currentVersion.replace(/^[\~\^]/, '');
        }
        return isSame;
    }

    /**
     * 检测是否已经全局下载包
     * @param {String} packageName 
     */
    static hasGlobalPackage(packageName) {
        const { name, version } = this.splitPackageName(packageName);

        // 这里加上 smash-cli 的原因是：
        // 如果查找不到包正常应该是返回 {}
        // 但是执行命令的时候如果是这个结果，会报错。
        // 所以默认加上 smash-cli，一起做查找操作。
        const command = `npm list -g --depth=0 --json smash-cli ${name}`;
        const options = {};
        let isSame = false;

        let result = Shell.exec(command, options);
        // 正常输出的结果如下： 
        // result = {
        //     "dependencies": {
        //         "smash-cli": {
        //             "version": "0.0.1"
        //         }
        //     }
        // }
        if (result instanceof Error) {
            isSame = false;
        } else {
            result = JSON.parse(result) || {};
            const dependencies = result.dependencies;
            if (dependencies && dependencies.hasOwnProperty(name)) {
                const currentVersion = dependencies[name].version;
                isSame = this.isSameVersion(version, currentVersion);
            }
        }
        return isSame;
    }

    /**
     * 检测是否在smash-cli的devDependencies里下载了包
     * @param {String} packageName 
     */
    static hasLocalPackage(packageName) {
        let isSame = false;
        const { name, version } = this.splitPackageName(packageName);
        const devDependencies = PackageInfo.devDependencies || {};

        // （步骤1）检测是否下载过
        // 如果没下载过包，直接返回false
        if (!devDependencies.hasOwnProperty(name)) {
            isSame = false;
        }
        // 有下载过该包，进入步骤2。
        // （步骤2）匹配版本号
        else {
            // npm包的规则比较复杂：
            // * 这意味着安装最新版本的依赖包
            // ~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
            // ^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
            const currentVersion = devDependencies[name]; // 已经下载的版本号
            isSame = this.isSameVersion(version, currentVersion);
        }
        return isSame;
    }

    /**
     * 先过滤重复的名称，再与package.json的dev依赖匹配得到未下载的包。
     * @param {Object} middlewareConfigQueue  中间件配置队列
     */
    static getUninstalledPackageNames(middlewareConfigQueue) {
        // 过滤重复的中间件。
        // （1）遍历 middlewareConfigQueue
        const packageNames = []; // 存放中间件名，格式为 @group/name@version
        middlewareConfigQueue.forEach((currentMiddlewareConfig) => {
            // （1.1）取到当前的 middlewareConfig 的纯包名和版本。
            const { name: currentPackageName } = currentMiddlewareConfig;
            const { name: currentPurePackageName } = this.splitPackageName(currentPackageName);

            // （2）遍历 packageNames 
            if (packageNames.length <= 0) {
                packageNames.push(currentPackageName);
            } else {
                for (let idx = 0, L = packageNames.length; idx < L; idx++) {
                    let idxPackageName = packageNames[idx];
                    let { name: idxPurePackageName } = this.splitPackageName(idxPackageName);
                    // （2.1）这个是重复的包，退出循环。
                    if (currentPurePackageName === idxPurePackageName) {
                        break;
                    }
                    // （2.2）这个是不重复的包，把它加入 packageNames 。
                    else if (idx === L - 1) {
                        packageNames.push(currentPackageName);
                    }
                }
            }
        });

        // 拿到未下载的中间件。
        const uninstalledPackageNames = [];
        packageNames.forEach(currentPackageName => {
            if (!this.hasLocalPackage(currentPackageName)) {
                uninstalledPackageNames.push(currentPackageName);
            }
        });

        return uninstalledPackageNames;
    }

    /**
     * 下载npm包，下载到smash-cli目录下。
     * @param {String} packageName 
     */
    static localInstall(packageName) {
        const result = Shell.exec(`npm install --save-dev ${packageName}`, {
            windowsHide: true,
            cwd: Config.PackageDirectory, // 定义子进程的当前工作目录，在smash-cli包目录内下载。
        });
        return result;
    }
}

module.exports = PackageLoader;