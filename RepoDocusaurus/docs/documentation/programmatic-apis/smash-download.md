---
title: smash-download
sidebar_label: smash-download
---

<a class="link-npm-version" href="https://www.npmjs.com/package/smash-download" target="_blank" title="npm">
    <img src="https://img.shields.io/npm/v/smash-download" alt="npm"/>
</a>

Template downloader for smash-cli.

## Installation

```bash
$ npm install smash-download
```

## Usage

```javascript
const smashInstall = require('smash-download');

// Download and decompress the tarball into the working directory.
smashInstall('smash-template-react');
```

## Tip

The `.backup` suffix string in the file name will be removed.
