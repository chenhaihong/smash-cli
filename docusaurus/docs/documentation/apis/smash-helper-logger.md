---
title: smash-helper-logger
sidebar_label: smash-helper-logger
---

Logger helper for `smash-cli`.

# Installation

```bash
$ npm install smash-helper-logger
```

## Usage

```javascript
const SmashLogger = require('smash-helper-logger');
const logger = new Logger('pkg-name');

logger.log('Hello world.'); // pkg-name log Hello world.
logger.info('Hello world.'); // pkg-name info Hello world.
logger.warn('Hello world.'); // pkg-name warn Hello world.
logger.error('Hello world.'); // pkg-name error Hello world.
logger.success('Hello world.'); // pkg-name success Hello world.
logger.fail('Hello world.'); // pkg-name fail Hello world.
```
