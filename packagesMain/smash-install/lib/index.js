/**
 * smash-cli工具的模板安装器。
 */

const os = require('os');
const { resolve } = require('path');
const fse = require('fs-extra');
const logger = require('smash-helper-logger');
const pacote = require('pacote');
const tar = require('tar');

const REPO = resolve(os.homedir(), '.smash-cli/template'); // 本机存放smash模板的仓库

module.exports = smashInstall;

/**
 * 安装模板到工作目录，然后拷贝里面的文件到工作目录。
 * @param {String} tplName 模板名，比如：smash-template-react@^16.0.0
 * @returns {void}
 */
async function smashInstall(tplName) {
  try {
    // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误。
    const { name, version } = await pacote.manifest(tplName);

    // （2）组装模板包的存放路径。将源码压缩包下载到本地仓库下。
    const templateDest = resolve(REPO, `${name}-${version}.tgz`);
    await pacote.tarball.toFile(tplName, templateDest);

    // （3）解压源码。
    const dir = resolve(REPO, `${name}-${version}`);
    fse.ensureDirSync(dir);
    await tar.x({ file: templateDest, C: dir });

    // （4）将解压的代码拷贝到工作目录。
    // 部分文件，比如.gitignore、.npmignore并不会被发布到官方仓库，所以需要增加一个逻辑。
    // 这个逻辑是：针对被忽略发布文件，在目录下新增有特殊后缀名.backup的冗余文件，用来替代发布。
    // 后续，拷贝的逻辑，针对特殊后缀名称的文件，将其名称做修改成没有后缀的名称。
    const srcDir = resolve(dir, './package');
    const destDir = process.cwd();
    fse.copySync(srcDir, destDir, {
      filter: (file) => {
        const reg = /\.backup$/;
        if (file.match(reg)) {
          const relativeFile = file.replace(srcDir, '');
          const destFile = resolve(
            destDir,
            `./${relativeFile.replace(reg, '')}`
          );
          fse.copySync(file, destFile);
          return false;
        }
        return true;
      },
    });

    logger.success('successfully installed.');
  } catch (error) {
    logger.fail(error.message);
  }
}
