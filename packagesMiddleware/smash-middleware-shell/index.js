/**
 * A shell executor middleware for smash-cli.
 */

const execSh = require('exec-sh');

module.exports = function shell(ctx, config, next) {
  let { commonds } = config;
  Array.isArray(commonds) && (commonds = commonds.join(' && '));

  execSh(commonds, (err) => {
    if (err) {
      console.log('');
      console.log(`[smash-middleware-shell] End with exit code ${err.code}.`);
      return;
    }

    if (next) {
      console.log('');
      next();
    }
  });
};
