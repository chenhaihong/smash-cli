---
title: smash-install
sidebar_label: smash-install
---

Template downloader for smash-cli.

## Usage

```javascript
const smashInstall = require('smash-install');

// Download and decompress the tarball into the working directory.
smashInstall('smash-template-react');
```

## Tip

The `.backup` suffix string in the file name will be removed.
