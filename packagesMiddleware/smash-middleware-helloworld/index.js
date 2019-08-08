/**
 *  A Helloworld middleware for smash-cli.
 * @param {Object} ctx You can use 'ctx' to transfer data from one middleware to another one.
 * @param {Object} config Config for the current middleware.
 * @param {Function} next The next middleware function.
 */
module.exports = function middleware(ctx, config, next) {
  // Do what u want here.
  console.log(
    // ctx,
    // config,
    'Hello world'
  );

  next(); // If u type this line, the QueueRunner will run the next middleware.
};
