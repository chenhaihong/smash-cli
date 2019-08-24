---
title: Writing a middleware
sidebar_label: Writing a middleware
---

It is very easy to write your own middleware.

## 1. Download helloworld middleware

Execute the following command to download `smash-middleware-helloworld`:

```bash
$ mkdir smash-middleware-demo && cd smash-middleware-demo
$ smash i smash-middleware-helloworld
```

Change your package's name into `smash-middleware-[name]`:

```json
{
  "name": "smash-middleware-demo",
  "keywords": ["smash", "smash-cli", "smash middleware", "other keyword"]
}
```

Don't forget update your keywords meanwhile.

## 2. Add your codes

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

## 3. Publish

Execute `npm publish --access public` to publish it.
