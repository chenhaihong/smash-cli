const { execSync } = require('child_process');
const path = require('path');
const fse = require('fs-extra');

// const smashCli = path.resolve(__dirname, '../lib/bin.js');

// // 测试初初始化命令
// {
//   const timeName = 'Test smash init';
//   console.time(timeName);
//   {
//     const cwd = path.resolve(__dirname, './temp/smash-init');
//     fse.ensureDirSync(cwd);
//     const r = execSync(`node ${smashCli} init`, { cwd, encoding: 'utf8' });
//     console.log(r);
//   }
//   console.timeEnd(timeName);
// }

// // 测试安装模板命令
// {
//   const timeName = 'Test smash install';
//   console.time(timeName);
//   {
//     const cwd = path.resolve(__dirname, './temp/smash-install');
//     fse.ensureDirSync(cwd);
//     const r = execSync(`node ${smashCli} install smash-middleware-helloworld`, { cwd, encoding: 'utf8' });
//     console.log(r);
//   }
//   console.timeEnd(timeName);
// }

// // 测试运行任务命令
// {
//   const timeName = 'Test smash run';
//   console.time(timeName);
//   {
//     const cwd = path.resolve(__dirname, './temp/smash-run');
//     fse.ensureDirSync(cwd);
//     const r1 = execSync(`node ${smashCli} init`, { cwd, encoding: 'utf8' });
//     console.log(r1);
//     const r2 = execSync(`node ${smashCli} run helloworld`, { cwd, encoding: 'utf8' });
//     console.log(r2);
//   }
//   console.timeEnd(timeName);
// }

// const dir = path.resolve(__dirname, 'smash-tmp');

// beforeAll(() => {
//   fse.removeSync(dir);
//   init(dir, () => {});
// });

// afterAll(() => {
//   fse.removeSync(dir);
// });

// describe('smash-cli/bin', () => {
//   test('"smash" should run well', (done) => {
//     expect.assertions(1);
//     execSh(`node ${mese}`, { cwd: dir }, function(err, stdout, stderr) {
//       expect(err).toBeNull();
//       done();
//     });
//   });

//   test('"mese -v" should run well', (done) => {
//     expect.assertions(1);
//     execSh(`node ${mese} -v`, { cwd: dir }, function(err) {
//       expect(err).toBeNull();
//       done();
//     });
//   });

//   test('"mese -h" should run well', (done) => {
//     expect.assertions(1);
//     execSh(`node ${mese} -h`, { cwd: dir }, function(err) {
//       expect(err).toBeNull();
//       done();
//     });
//   });
// });
