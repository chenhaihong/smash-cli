---
title: smash-helper-logger
sidebar_label: smash-helper-logger
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-helper-logger" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-helper-logger" alt="npm"/>
</a>

Logger helper for `smash-cli`.

## Installation

```bash
$ npm install smash-helper-logger
```

## Usage

```javascript
const SmashLogger = require('smash-helper-logger');
const logger = new Logger('package-name');

logger.log('Hello world.'); // package-name log Hello world.
logger.info('Hello world.'); // package-name info Hello world.
logger.warn('Hello world.'); // package-name warn Hello world.
logger.error('Hello world.'); // package-name error Hello world.
logger.success('Hello world.'); // package-name success Hello world.
logger.fail('Hello world.'); // package-name fail Hello world.
```
