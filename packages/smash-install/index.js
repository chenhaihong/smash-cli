/**
 * smash-cli工具的模板安装器。
 */

const os = require('os');
const path = require('path');
const fse = require('fs-extra');
const pacote = require('pacote');
const tar = require('tar');
const message = require('./message');

const TEMPLATE_REPOSITORY = path.resolve(os.homedir(), '.smash-cli/template'); // 本机存放smash模板的仓库

/**
 * 安装模板到工作目录，然后拷贝里面的文件到工作目录。
 * @param {String} templateName 模板名，比如：smash-template-react@^16.0.0
 */
const installTemplate = async (templateName) => {
  try {
    // （1）获取包的信息，检出包名、版本号。如果不存在，会抛出错误。
    const { name, version } = await pacote.manifest(templateName);

    // （2）组装模板包的存放路径。将源码压缩包下载到本地仓库下。
    const templateDest = path.resolve(TEMPLATE_REPOSITORY, `${name}-${version}.tgz`);
    await pacote.tarball.toFile(templateName, templateDest);

    // （3）解压源码。
    const dir = path.resolve(TEMPLATE_REPOSITORY, `${name}-${version}`);
    fse.ensureDirSync(dir);
    await tar.x({ file: templateDest, C: dir });

    // （4）将解压的代码拷贝到工作目录。
    // 部分文件，比如.gitignore、.npmignore并不会被发布到官方仓库，所以需要增加一个逻辑。
    // 这个逻辑是：针对被忽略发布文件，在目录下新增有特殊后缀名.backup的冗余文件，用来替代发布。
    // 后续，拷贝的逻辑，针对特殊后缀名称的文件，将其名称做修改成没有后缀的名称。
    const srcDir = path.resolve(dir, './package');
    const destDir = process.cwd();
    fse.copySync(srcDir, destDir, {
      filter: file => {
        const reg = /\.backup$/;
        if (file.match(reg)) {
          const relativeFile = file.replace(srcDir, '');
          const destFile = path.resolve(destDir, `./${relativeFile.replace(reg, '')}`);
          fse.copySync(file, destFile);
          return false;
        }
        return true;
      },
    });

    console.log(message.SUCCESSFULLY_INSTALLED_TEMPLATE);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = installTemplate;