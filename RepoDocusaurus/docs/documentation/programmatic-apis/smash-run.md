---
title: smash-run
sidebar_label: smash-run
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-run" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-run" alt="npm"/>
</a>

Task executor for smash-cli.

## Installation

```bash
$ npm install smash-run
```

## Usage

### Create `task.yml`

Create `{cwd}/.smash/task.yml`:

```yaml
task-helloworld:
  - name: smash-middleware-helloworld
  - name: smash-middleware-helloworld
```

### Run task

```javascript
const smashRun = require('smash-run');

smashRun('task-helloworld');
// helloworld
// helloworld
```
