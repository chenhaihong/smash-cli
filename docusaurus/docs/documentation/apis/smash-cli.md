---
title: smash-cli
sidebar_label: smash-cli
---

A tiny task management and execution tool. Yeah, really tiny.

# Installation

```bash
$ npm install smash-cli
```

## Usage

```javascript
const programmaticSmash = require('smash-cli');
const { init, install, run } = programmaticSmash;

// generate .smash/stak.yml under current working directory.
init();

// install smash-template-react under current working directory.
install('smash-template-react');

// Run helloworld task.
run('helloworld');
```
