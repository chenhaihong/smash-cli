const { resolve } = require('path');
const fse = require('fs-extra');

const file = resolve(__dirname, 'file.json');
const data = fse.readJSONSync(file);
fse.outputJSONSync(
  file,
  { ...data, b: 100 },
  {
    spaces: 2,
  }
);
