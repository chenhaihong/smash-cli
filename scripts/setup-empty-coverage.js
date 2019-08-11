const { resolve } = require('path');
const fse = require('fs-extra');

const dir = resolve(__dirname, '../coverage');

// 清空覆盖率目录
fse.emptyDirSync(dir);
