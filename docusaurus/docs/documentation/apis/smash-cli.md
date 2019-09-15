---
title: smash-cli
sidebar_label: smash-cli
---

A tiny task manager for modern JavaScript projects.

## Installation

```bash
$ npm install smash-cli
```

## Usage

```javascript
const programmaticSmash = require('smash-cli');
const { init, install, run } = programmaticSmash;

// generate .smash/stak.yml
init();

// install smash-template-react
install('smash-template-react');

// Run helloworld task.
run('helloworld');
```
