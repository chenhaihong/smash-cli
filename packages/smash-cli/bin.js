#!/usr/bin/env node

const program = require('commander');
const smash = require('.');
const { version } = require('./package.json');

// 注册版本号
program
  .version(version, '-v, --version');

// 注册初始化命令：该命令会在工作目录下生成.smash/task.yml文件
program
  .command('init')
  .description('Create default task config file')
  .action(function () {
    smash.init();
  });

// 注册安装命令：该命令会在工作目录下安装模板项目
program
  .command('install <template>')
  .alias('i')
  .description('Download <template>')
  .action(function (templateName) {
    smash.install(templateName);
  });

// 注册run命令：该命令会执行任务里的中间件。
program
  .command('run <task>')
  .alias('r')
  .description('Execute <task>')
  .action(function (taskName) {
    smash.run(taskName);
  });

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