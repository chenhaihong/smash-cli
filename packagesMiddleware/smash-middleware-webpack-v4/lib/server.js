const fs = require('fs');
const net = require('net');
const path = require('path');

const fse = require('fs-extra');
const portfinder = require('portfinder');
const webpack = require('webpack');

const DEFAULT_PORT = 8080;

const { colors, status, version, bonjour, defaultTo } = require('webpack-dev-server/bin/utils');

const Server = require('webpack-dev-server');

const addEntries = require('webpack-dev-server/lib/utils/addEntries');
const createDomain = require('webpack-dev-server/lib/utils/createDomain');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');

let server;

const signals = ['SIGINT', 'SIGTERM'];

signals.forEach((signal) => {
  process.on(signal, () => {
    if (server) {
      server.close(() => {
        // eslint-disable-next-line no-process-exit
        process.exit();
      });
    } else {
      // eslint-disable-next-line no-process-exit
      process.exit();
    }
  });
});

function processOptions(config) {
  // processOptions {Promise}
  if (typeof config.then === 'function') {
    config.then(processOptions).catch((err) => {
      console.error(err.stack || err);
      // eslint-disable-next-line no-process-exit
      process.exit();
    });

    return;
  }

  const firstWpOpt = Array.isArray(config) ? config[0] : config;

  const options = config.devServer || {};

  if (!options.host) {
    options.host = 'localhost';
  }

  if (!options.publicPath) {
    // eslint-disable-next-line
    options.publicPath = (firstWpOpt.output && firstWpOpt.output.publicPath) || '';

    if (!/^(https?:)?\/\//.test(options.publicPath) && options.publicPath[0] !== '/') {
      options.publicPath = `/${options.publicPath}`;
    }
  }

  if (!options.filename) {
    options.filename = firstWpOpt.output && firstWpOpt.output.filename;
  }

  if (!options.watchOptions) {
    options.watchOptions = firstWpOpt.watchOptions;
  }

  if (options.stdin) {
    process.stdin.on('end', () => {
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });

    process.stdin.resume();
  }

  if (!options.hot) {
    options.hot = false;
  }

  if (!options.hotOnly) {
    options.hotOnly = false;
  }

  if (!options.clientLogLevel) {
    options.clientLogLevel = 'info';
  }

  if (options.contentBase === undefined) {
    if (options.contentBase) {
      if (Array.isArray(options.contentBase)) {
        options.contentBase = options.contentBase.map((p) => path.resolve(p));
      } else if (/^[0-9]$/.test(options.contentBase)) {
        options.contentBase = +options.contentBase;
      } else if (!/^(https?:)?\/\//.test(options.contentBase)) {
        options.contentBase = path.resolve(options.contentBase);
      }
      // It is possible to disable the contentBase by using
      // `--no-content-base`, which results in arg["content-base"] = false
    } else if (options.contentBase === false) {
      options.contentBase = false;
    }
  }

  if (options.cert) {
    options.cert = fs.readFileSync(path.resolve(options.cert));
  }

  if (options.key) {
    options.key = fs.readFileSync(path.resolve(options.key));
  }

  if (options.cacert) {
    options.ca = fs.readFileSync(path.resolve(options.cacert));
  }

  if (options.pfx) {
    options.pfx = fs.readFileSync(path.resolve(options.pfx));
  }

  if (options.openPage) {
    options.open = true;
  }

  if (typeof options.open !== 'undefined') {
    options.open = options.open !== '' ? options.open : true;
  }

  if (options.open && !options.openPage) {
    options.openPage = '';
  }

  if (options.port != null) {
    startDevServer(config, options);

    return;
  }

  portfinder.basePort = DEFAULT_PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      throw err;
    }
    options.port = port;
    startDevServer(config, options);
  });
}

function processCustomedOptions(config) {
  let options = config.devServer;
  if (!options || !(typeof options === 'object')) {
    options = {};
    config.devServer = options;
  }

  // const oldBefore = options.before;
  // options.before = (app) => {
  //   app.use((req, res, next) => {
  //     console.log(`[${req.method}] ${req.url}`);
  //     next();
  //   });

  //   oldBefore && oldBefore(app);

  //   addMocks(app);
  // };

  if (!options.stats) {
    options.stats = {
      cached: false,
      cachedAssets: false,
      colors: true,
    };
  }
}

function startDevServer(config, options) {
  const log = createLogger(options);

  addEntries(config, options);

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

  if (options.progress) {
    new webpack.ProgressPlugin({
      profile: options.profile,
    }).apply(compiler);
  }

  const suffix = options.inline !== false || options.lazy === true ? '/' : '/webpack-dev-server/';

  try {
    server = new Server(compiler, options, log);
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

        const uri = createDomain(options, server.listeningApp) + suffix;

        status(uri, options, log, options.color);
      });
    });
  } else {
    server.listen(options.port, options.host, (err) => {
      if (err) {
        throw err;
      }

      if (options.bonjour) {
        bonjour(options);
      }

      const uri = createDomain(options, server.listeningApp) + suffix;

      status(uri, options, log, options.color);
    });
  }
}

// function addMocks(app) {
//   let mocks = {};
//   const dir = path.resolve(process.cwd(), './mock');
//   fse.ensureDirSync(dir);
//   const files = fs.readdirSync(dir);
//   for (const file of files) {
//     const filePath = `${dir}/${file}`;
//     if (/\.js$/.test(file) && fs.statSync(filePath).isFile()) {
//       mocks = { ...mocks, ...require(filePath) };
//     }
//   }

//   for (const path in mocks) {
//     if (!mocks.hasOwnProperty(path)) continue;
//     let { method, result } = mocks[path];
//     app[method](path, function (req, res) {
//       typeof result === 'function'
//         ? res.json(result())
//         : res.json(result);
//     });
//   }
// }

module.exports = (config) => {
  // 自定义处理逻辑
  processCustomedOptions(config);
  // webpack-dev-server 处理逻辑
  processOptions(config);
};
