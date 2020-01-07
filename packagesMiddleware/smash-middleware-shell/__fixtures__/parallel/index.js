const execSh = require('exec-sh');
const treeKill = require('tree-kill');

execSh('node resident-1.js', { cwd: __dirname });
execSh('node resident-2.js', { cwd: __dirname });

setInterval(() => {
  console.log(`Root ${process.pid}`);
}, 500);

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    treeKill(process.pid, 'SIGINT', function(err) {
      process.exit(0);
    });
  });
});
