---
title: smash-helper-middleware-installer
sidebar_label: smash-helper-middleware-installer
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-helper-middleware-installer" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-helper-middleware-installer" alt="npm"/>
</a>

Logger helper for `smash-cli`.

## 1 Installation

```bash
$ npm install smash-helper-middleware-installer
```

## 2 Usage

Import `smash-helper-middleware-installer`.

```javascript
const HMI = require('smash-helper-middleware-installer');
```

### 2.1 HMI.getUnrepeatedMiddlewareSpecifiers(tasks)

```javascript
const HMI = require('smash-helper-middleware-installer');
const tasks = {
  helloworld: [
    { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' },
    { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' },
    { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' },
  ],
};
const result = HMI.getUnrepeatedMiddlewareSpecifiers(tasks); // ['smash-middleware-helloworld']
```

### 2.2 HMI.resolveInstallationPath(name, version)

```javascript
const HMI = require('smash-helper-middleware-installer');
const name = 'smash-middleware-helloworld';
const version = '0.0.22';
const result = HMI.resolveInstallationPath(name, version);
// /home/.smash-cli/middleware/smash-middleware-helloworld/0.0.22
```

### 2.3 HMI.manifest(specifier)

```javascript
const HMI = require('smash-helper-middleware-installer');
const specifier = 'smash-middleware-helloworld';
const result = HMI.manifest(specifier);
// { name: 'smash-middleware-helloworld', version: '0.0.22' }
```

### 2.4 HMI.hasInstalled(name, version)

```javascript
const HMI = require('smash-helper-middleware-installer');
const name = 'smash-middleware-helloworld';
const version = '0.0.22';
const result = HMI.hasInstalled(name, version);
// true if installed
// false if not installed
```

### 2.5 HMI.install(name, version)

```javascript
const HMI = require('smash-helper-middleware-installer');
const name = 'smash-middleware-helloworld';
const version = '0.0.22';
HMI.install(name, version);
```

### 2.6 HMI.writeInstalledPath(specifier, installedPath)

```javascript
const HMI = require('smash-helper-middleware-installer');
const specifier = 'smash-middleware-helloworld@0.0.22';
const installedPath = '/home/.smash-cli/middleware/smash-middleware-helloworld/0.0.22';
HMI.writeInstalledPath(specifier, installedPath);
```

### 2.7 HMI.readInstalledPath(specifier)

```javascript
const HMI = require('smash-helper-middleware-installer');
const specifier = 'smash-middleware-helloworld@0.0.22';
const result = HMI.readInstalledPath(specifier);
// '/home/.smash-cli/middleware/smash-middleware-helloworld/0.0.22'
```
