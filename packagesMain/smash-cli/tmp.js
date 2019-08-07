const { resolve } = require('path');
const execShPromise = require('exec-sh').promise;
const fse = require('fs-extra');

const ROOT = resolve(__dirname); // 该包的根目录
const TEMP_CWD = resolve(ROOT, '__temp__');
const smashBin = resolve(ROOT, 'lib/bin.js');
const bin = (command) => execShPromise(`${smashBin} ${command}`, { cwd: TEMP_CWD, stdio: false });

fse.ensureDirSync(TEMP_CWD);

async function a() {
  try {
    const out = await bin('-v');
    console.log(out.stdout);
  } catch (error) {
    console.log(error);
  }
}
a();
