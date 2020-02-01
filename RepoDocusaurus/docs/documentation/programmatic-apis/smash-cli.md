---
title: smash-cli
sidebar_label: smash-cli
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-cli" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-cli" alt="npm"/>
</a>

A tiny task manager for modern JavaScript projects.

## Installation

```bash
$ npm install smash-cli
```

## Usage

```javascript
const programmaticSmash = require('smash-cli');
const { init, download, install, run } = programmaticSmash;

// create .smash/stak.yml
init();

// download template package
download('smash-template-react');

// install middlewares
install();

// run helloworld task.
run('helloworld');
```
