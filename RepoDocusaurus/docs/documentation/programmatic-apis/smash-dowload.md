---
title: smash-dowload
sidebar_label: smash-dowload
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-dowload" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-dowload" alt="npm"/>
</a>

Template downloader for smash-cli.

> `smash-download` is not allowed, so I rename it to `smash-dowload`.

## Installation

```bash
$ npm install smash-dowload
```

## Usage

```javascript
const smashInstall = require('smash-dowload');

// Download and decompress the tarball into the working directory.
smashInstall('smash-template-react');
```

## Tip

The `.backup` suffix string in the file name will be removed.
