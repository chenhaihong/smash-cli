---
title: smash-run
sidebar_label: smash-run
---

Task executor for smash-cli.

## Installation

```bash
$ npm install smash-run
```

## Usage

### Create `task.yml`

Create `{cwd}/.smash/task.yml`:

```yaml
helloworld-task:
  - name: smash-middleware-helloworld
  - name: smash-middleware-helloworld
```

### Run task

```javascript
const smashRun = require('smash-run');

smashRun('helloworld-task');
// helloworld
// helloworld
```
