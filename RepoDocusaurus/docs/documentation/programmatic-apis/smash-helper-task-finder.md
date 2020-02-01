---
title: smash-helper-task-finder
sidebar_label: smash-helper-task-finder
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-helper-task-finder" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-helper-task-finder" alt="npm"/>
</a>

Task finder helper for `smash-cli`.

## 1 Installation

```bash
$ npm install smash-helper-task-finder
```

## 2 Usage

Import `smash-helper-task-finder`.

```javascript
const HTF = require('smash-helper-task-finder');
```

### 2.1 HTF.getTasks()

```javascript
const HTF = require('smash-helper-task-finder');

// Get tasks
const tasks = HTF.getTasks();
// {
//   'helloworld': [
//     { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' }
//   ],
// }
```

### 2.2 HTF.getMiddlewareQueue(taskName)

```javascript
const HTF = require('smash-helper-task-finder');

// Get middleware queue of a task
const taskName = 'helloworld';
const middlewareQueue = HTF.getMiddlewareQueue(taskName);

// [
//   { name: 'smash-middleware-helloworld', paramA: 'param a', paramB: 'param b' }
// ]
```
