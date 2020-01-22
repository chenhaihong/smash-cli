const { join } = require('path');

const cwd = process.cwd();

module.exports = {
  // entry
  entryJsDir: join(cwd, 'src'),
  entryLibDir: join(cwd, 'lib'),
  entryHtmlDir: join(cwd, 'src/assets'),

  // output
  outputDir: join(cwd, 'dist'),

  // mock
  mockDir: join(cwd, 'mock'),

  // proxy
  proxyFile: join(cwd, 'proxy.js'),
};
