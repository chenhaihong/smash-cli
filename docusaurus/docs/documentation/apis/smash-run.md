---
title: smash-run
sidebar_label: smash-run
---

# Installation

```bash
$ npm install smash-run
```

## Usage

### 1. Create `task.yml`

Create `{cwd}/.smash/task.yml`:

```yaml
helloworld-task:
  - name: smash-middleware-helloworld
  - name: smash-middleware-helloworld
```

### 2. Run task

```javascript
const smashRun = require('smash-run');

smashRun('helloworld-task');
```
