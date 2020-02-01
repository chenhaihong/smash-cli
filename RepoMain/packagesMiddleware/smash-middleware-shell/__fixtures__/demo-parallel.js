const { resolve } = require('path');
const execSh = require('exec-sh');
const treeKill = require('tree-kill');

execSh('node resident-1.js', { cwd: resolve(__dirname, 'parallel') });
execSh('node resident-2.js', { cwd: resolve(__dirname, 'parallel') });

const id = setInterval(() => {
  console.log(`Root ${process.pid}`);
}, 500);

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    clearInterval(id);
    console.log(`Root ${process.pid} ${signal}`);
    treeKill(process.pid, 'SIGINT', function(err) {
      process.exit(0);
    });
  });
});
