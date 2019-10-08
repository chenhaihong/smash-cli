/**
 * 文件内容来源：webpack-dev-server@3.8.2
 *              https://github.com/webpack/webpack-dev-server/blob/v3.8.2/bin/webpack-dev-server.js
 */

const fs = require('fs');
const net = require('net');
const webpack = require('webpack');

// webpack-dev-server
const Server = require('webpack-dev-server/lib/Server');
const setupExitSignals = require('webpack-dev-server/lib/utils/setupExitSignals');
const colors = require('webpack-dev-server/lib/utils/colors');
const processOptions = require('webpack-dev-server/lib/utils/processOptions');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');
const getVersions = require('webpack-dev-server/lib/utils/getVersions');
const options = require('webpack-dev-server/bin/options');

let server;
const serverData = {
  server: null,
};
// we must pass an object that contains the server object as a property so that
// we can update this server property later, and setupExitSignals will be able to
// recognize that the server has been instantiated, because we will set
// serverData.server to the new server object.
setupExitSignals(serverData);

function startDevServer(config, options) {
  const log = createLogger(options);

  let compiler;

  try {
    compiler = webpack(config);
  } catch (err) {
    if (err instanceof webpack.WebpackOptionsValidationError) {
      log.error(colors.error(options.stats.colors, err.message));
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    throw err;
  }

  try {
    server = new Server(compiler, options, log);
    serverData.server = server;
  } catch (err) {
    if (err.name === 'ValidationError') {
      log.error(colors.error(options.stats.colors, err.message));
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    throw err;
  }

  if (options.socket) {
    server.listeningApp.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        const clientSocket = new net.Socket();

        clientSocket.on('error', (err) => {
          if (err.code === 'ECONNREFUSED') {
            // No other server listening on this socket so it can be safely removed
            fs.unlinkSync(options.socket);

            server.listen(options.socket, options.host, (error) => {
              if (error) {
                throw error;
              }
            });
          }
        });

        clientSocket.connect({ path: options.socket }, () => {
          throw new Error('This socket is already used');
        });
      }
    });

    server.listen(options.socket, options.host, (err) => {
      if (err) {
        throw err;
      }

      // chmod 666 (rw rw rw)
      const READ_WRITE = 438;

      fs.chmod(options.socket, READ_WRITE, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  } else {
    server.listen(options.port, options.host, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

module.exports = (config) => {
  // 启动webpack-dev-server
  processOptions(config, {}, (config, options) => {
    startDevServer(config, options);
  });
};
