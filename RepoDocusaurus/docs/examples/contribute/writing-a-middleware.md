---
title: Writing a middleware
sidebar_label: Writing a middleware
---

It is very easy to build your own middleware package.

## 1 Download the `helloworld` middleware

We have prepared a `helloworld` middleware for you. Run the command to download `smash-middleware-helloworld`:

```bash
$ mkdir smash-middleware-demo && cd smash-middleware-demo
$ smash download smash-middleware-helloworld
```

## 2 Rename the package

Rename your middleware package like `smash-middleware-[name]` :

```json
{
  "name": "smash-middleware-demo",
  "keywords": ["smash", "smash-cli", "smash middleware", "other keyword"]
}
```

Don't forget to add your keywords.

## 3 Add your own codes

Add your codes into function `SmashHelloWorld`.

```javascript
/**
 *  A Helloworld middleware for smash-cli.
 * @param {Object} ctx You can use 'ctx' to transfer data from one middleware to another one.
 * @param {Object} config Config for the current middleware.
 * @param {Function} next The next middleware function.
 */
module.exports = function SmashHelloWorld(ctx, config, next) {
  // Do what u want here.
  console.log(
    // ctx,
    // config,
    'Hello world'
  );

  next && next(); // If u type this line, the QueueRunner will run the next middleware.
};
```

## 4 Publish

Execute `npm publish --access public` to publish it.
