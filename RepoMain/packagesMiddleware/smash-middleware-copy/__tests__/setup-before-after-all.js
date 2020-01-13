const { resolve } = require('path');
const fse = require('fs-extra');

const lastCwd = process.cwd();
const ROOT = resolve(__dirname, '..');
const FIXTURE = resolve(ROOT, '__fixtures__/smash-project');
const DIST = resolve(FIXTURE, 'dist');

beforeAll(() => {
  fse.emptyDirSync(DIST);
  process.chdir(FIXTURE);
});

afterAll(() => {
  process.chdir(lastCwd);
  fse.removeSync(DIST);
});
